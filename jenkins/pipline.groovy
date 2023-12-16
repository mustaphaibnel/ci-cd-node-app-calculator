pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node16'
    }

    parameters {
        string(name: 'GITHUB_URL', defaultValue: 'https://github.com/mustaphaibnel/ci-cd-node-app-calculator', description: 'GitHub Repository URL')
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to deploy')
        string(name: 'PROJECT_NAME', defaultValue: 'calculator', description: 'Project Name')
        string(name: 'DOCKER_USERNAME', defaultValue: 'mustaphaibnel', description: 'Docker Hub Username')
        string(name: 'DOCKER_IMAGE_NAME', defaultValue: 'calculator', description: 'Docker Image Name')
        string(name: 'CONTAINER_PORT', defaultValue: '3000', description: 'Container port')
        string(name: 'HOST_PORT', defaultValue: '8090', description: 'Host port')
        string(name: 'EMAIL_NOTIFICATION', defaultValue: 'mustaphaibnel@gmail.com', description: 'Email for notifications')
        string(name: 'JENKINS_URL', defaultValue: 'https://jenkins.guidestudio.info', description: 'Jenkins Base URL')
        string(name: 'SONARQUBE_DASHBOARD_URL', defaultValue: 'https://sqube.guidestudio.info/dashboard?id=', description: 'SonarQube Dashboard Base URL')
        string(name: 'API_END_POINT_URL', defaultValue: 'https://app.guidestudio.info/', description: 'App Base URL')
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        MOCK_API_KEY = 'mock_api_key_value'
        EXPECTED_API_KEY = credentials('api-key-calculator-prod')
        ELASTIC_APM_ACTIVE= true
        APM_SERVICE_NAME= "${params.DOCKER_IMAGE_NAME}"
        APM_SECRET_TOKEN= ""
        APM_SERVER_URL= "https://apm.guidestudio.info"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code (github)') {
            steps {
                script {
                    def gitUrl = params.GITHUB_URL
                    def branch = params.BRANCH
                    checkout([$class: 'GitSCM', branches: [[name: branch]], userRemoteConfigs: [[url: gitUrl]]])
                    env.LAST_COMMIT_MESSAGE = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }


        stage('Run Tests and Coverage') {
            steps {
                script {
                    withEnv([
                        "EXPECTED_API_KEY=${env.MOCK_API_KEY}",
                        "ELASTIC_APM_ACTIVE=${env.ELASTIC_APM_ACTIVE}",
                        "APM_SERVICE_NAME=${env.APM_SERVICE_NAME}",
                        "APM_SECRET_TOKEN=${env.APM_SECRET_TOKEN}",
                        "APM_SERVER_URL=${env.APM_SERVER_URL}"
                    ]) {
                        sh 'npm run test:coverage'
                    }
                }
            }
        }


        stage('Generate HTML Coverage Report') {
            steps {
                script {
                    sh "mkdir -p ${env.WORKSPACE}/reports/coverage"
                    def coverageReportDir = "${env.WORKSPACE}/coverage"
                    if (fileExists(coverageReportDir)) {
                        // Set EXPECTED_API_KEY to MOCK_API_KEY temporarily
                        env.EXPECTED_API_KEY = env.MOCK_API_KEY
                        sh "npm run generate-html-report"
                        sh "cp -r ${coverageReportDir}/* ${env.WORKSPACE}/reports/coverage/"

                        // Reset EXPECTED_API_KEY to the original value
                        env.EXPECTED_API_KEY = credentials('api-key-calculator-prod')
                    } else {
                        error "Coverage report directory does not exist."
                    }
                }
            }
        }


        stage('Publish Coverage Report') {
            steps {
                script {
                    publishHTML(
                        target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: false,
                            keepAll: true,
                            reportDir: "${WORKSPACE}/reports/coverage",
                            reportFiles: 'index.html',
                            reportName: 'CodeCoverageReport',
                            reportTitles: 'Coverage Report '
                        ]
                    )
                }
            }
        }

        stage('Code Quality Analysis (SonarQube)') {
            steps {
                script {
                    withSonarQubeEnv('sonar-server') {
                        sh """
                            ${SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectName='${params.PROJECT_NAME}' \
                            -Dsonar.projectKey='${params.PROJECT_NAME}' \
                            -Dsonar.sources=src \
                            -Dsonar.test.exclusions=__tests__/** \
                            -Dsonar.javascript.lcov.reportPaths=${env.WORKSPACE}/coverage/lcov.info
                        """
                    }
                }
            }
        }

        stage('Quality Analysis Gate (sonarQube)') {
            steps {
                script {
                    waitForQualityGate abortPipeline: true, credentialsId: 'Sonar-token'
                }
            }
        }

        stage('Security Files Scanning (Trivy)') {
            steps {
                sh "mkdir -p ${env.WORKSPACE}/reports/trivy"
                sh "trivy fs --format json -o ${env.WORKSPACE}/reports/trivy/trivyfs.json ."
            }
        }

        stage('Security Benchmarking (OWASP)') {
            steps {
                dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Containerization (docker-hub)') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        sh "docker rmi -f ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest || true"
                        sh "docker build -t ${params.DOCKER_IMAGE_NAME} ."
                        sh "docker tag ${params.DOCKER_IMAGE_NAME} ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest"
                        sh "docker push ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest"
                    }
                }
            }
        }

        stage('Container Security Scanning (Trivy)') {
            steps {
                script {
                    def imageFullName = "${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest"
                    sh "trivy image --format template --template \"@/usr/local/share/trivy/templates/html.tpl\" -o ${WORKSPACE}/reports/trivy/trivyImageReport.html ${imageFullName} || true"
                }
            }
            post {
                always {
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: "${WORKSPACE}/reports/trivy",
                        reportFiles: 'trivyImageReport.html',
                        reportName: 'TrivyContainerVulnerabilityReport',
                        reportTitles: "Container Report for ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest"
                    ])
                }
            }
        }
stage('Deployment (Stages:prod,dev...)') {
    steps {
        script {
            // Stopping and removing the container if it exists
            sh "docker stop ${params.DOCKER_IMAGE_NAME} || true"
            sh "docker rm ${params.DOCKER_IMAGE_NAME} || true"

            // Pulling the latest version of the Docker image
            sh "docker pull ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest"

            // Building the docker run command with additional environment variables
            def dockerRunCmd = "docker run -d --name ${params.DOCKER_IMAGE_NAME} " +
                               "-e EXPECTED_API_KEY=\$EXPECTED_API_KEY " +
                               "-e ELASTIC_APM_ACTIVE=\$ELASTIC_APM_ACTIVE " +
                               "-e APM_SERVICE_NAME=\$APM_SERVICE_NAME " +
                               "-e APM_SECRET_TOKEN=\$APM_SECRET_TOKEN " +
                               "-e APM_SERVER_URL=\$APM_SERVER_URL " +
                               "-p ${params.HOST_PORT}:${params.CONTAINER_PORT} " +
                               "${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest"

            // Running the docker command with the environment variables
            sh(script: dockerRunCmd, environment: [
                'EXPECTED_API_KEY': env.EXPECTED_API_KEY,
                'ELASTIC_APM_ACTIVE': env.ELASTIC_APM_ACTIVE,
                'APM_SERVICE_NAME': env.APM_SERVICE_NAME,
                'APM_SECRET_TOKEN': env.APM_SECRET_TOKEN,
                'APM_SERVER_URL': env.APM_SERVER_URL
            ])
        }
    }
}


    }

    post {
        success {
            script {
                def buildDuration = currentBuild.durationString
                def buildTimestamp = new Date(currentBuild.startTimeInMillis).format("yyyy-MM-dd HH:mm:ss")
                def trivyFsReportHtmlUrl = "${params.JENKINS_URL}/job/${env.JOB_NAME}/TrivyVulnerabilityReportFile/"
                def trivyImageReportHtmlUrl = "${params.JENKINS_URL}/job/${env.JOB_NAME}/TrivyContainerVulnerabilityReport/"
                
                def emailBody = """
                    hello,
                    good news

                    ✅ Success: Pipeline Execution Report
                    #️⃣ Build Number: ${env.BUILD_NUMBER}

                    🏁 Build Start Time: ${buildTimestamp}
                    ⏱ Build Duration: ${buildDuration}
                    
                    🌿 Branch: ${params.BRANCH}
                    💬 Last Commit: ${env.LAST_COMMIT_MESSAGE}

                    📜 Build Link: ${params.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/console
                    🕵🏼‍♂️ SonarQube Dashboard: ${params.SONARQUBE_DASHBOARD_URL}${params.PROJECT_NAME}
                    📦 Dependency Check Report: ${params.JENKINS_URL}/job/${env.JOB_NAME}/lastCompletedBuild/dependency-check-findings/
                    📋 Code Coverage Report: ${params.JENKINS_URL}/job/${env.JOB_NAME}/CodeCoverageReport/
                    
                    🛡️ Trivy Filesystem Security Report: [View Report](${trivyFsReportHtmlUrl})
                    🛡️ Trivy Container Security Report: [View Report](${trivyImageReportHtmlUrl})                
                
                    🌐 GitHub Repository: ${params.GITHUB_URL}
                    🐳 Docker Repository: ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}

                    
                    🌍 API Endpoint: ${params.API_END_POINT_URL}

                    Regards,
                    Jenkins
                """

                mail to: params.EMAIL_NOTIFICATION,
                     subject: "SUCCESS: Pipeline Build #${env.BUILD_NUMBER}",
                     body: emailBody
            }
        }
    failure {
        script {
            def buildDuration = currentBuild.durationString
            def buildTimestamp = new Date(currentBuild.startTimeInMillis).format("yyyy-MM-dd HH:mm:ss")

            def emailBody = """
                hello,
                sadly bad news

                🛑 Failure: Pipeline Execution Report
                #️⃣ Build Number: ${env.BUILD_NUMBER}

                🏁 Build Start Time: ${buildTimestamp}
                ⏱ Build Duration: ${buildDuration}

                
                📜 Build Link: ${params.JENKINS_URL}/job/${env.JOB_NAME}/${env.BUILD_NUMBER}/console
                Please check the build link for more details.


                🌐 GitHub Repository: ${params.GITHUB_URL}
                🐳 Docker Repository: ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}

                Regards,
                Jenkins
            """

            mail to: params.EMAIL_NOTIFICATION,
                 subject: "FAILURE: Pipeline Build #${env.BUILD_NUMBER}",
                 body: emailBody
        }
    }
    }
}
