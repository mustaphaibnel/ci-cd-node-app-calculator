pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node16'
    }

    parameters {
        string(
            name: 'GITHUB_URL',
            defaultValue: 'https://github.com/mustaphaibnel/ci-cd-node-app-calculator',
            description: 'GitHub Repository URL (e.g., https://github.com/your-username/your-repo)',
        )
        string(
            name: 'BRANCH',
            defaultValue: 'main',
            description: 'Branch to deploy (e.g., main, develop)',
        )
        string(
            name: 'PROJECT_NAME',
            defaultValue: 'calculator',
            description: 'Project Name',
        )
        string(
            name: 'DOCKER_USERNAME',
            defaultValue: 'mustaphaibnel',
            description: 'Docker Hub Username (e.g., your Docker Hub account)',
        )
        string(
            name: 'DOCKER_IMAGE_NAME',
            defaultValue: 'calculator',
            description: 'Docker Image Name (e.g., the name of your Docker image)',
        )
        string(
            name: 'CONTAINER_PORT',
            defaultValue: '3000',
            description: 'Container port (e.g., 8090)',
        )
        string(
            name: 'HOST_PORT',
            defaultValue: '8090',
            description: 'Host port (e.g., 8090)',
        )
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
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
                sh 'npx jest --coverage'
            }
        }

        stage('Generate HTML Coverage Report') {
            steps {
                script {
                    // Ensure the coverage report directory exists
                    def coverageReportDir = "${env.WORKSPACE}/coverage"
                    if (fileExists(coverageReportDir)) {
                        // Generate HTML report using the coverage report
                        sh "npm run generate-html-report"
                    } else {
                        error "Coverage report directory does not exist."
                    }
                }
            }
        }

        stage('Publish Coverage Report') {
            steps {
                script {
                    // Publish the HTML coverage report
                    publishHTML(
                        target: [
                            allowMissing: false,
                            alwaysLinkToLastBuild: false,
                            keepAll: true,
                            reportDir: 'coverage',
                            reportFiles: 'index.html',
                            reportName: 'Code Coverage Report',
                            reportTitles: 'Coverage Report'
                        ]
                    )
                }
            }
        }

        stage('Code Quality Analysis (sonarQube)') {
            steps {
                script {
                    // Pass the coverage report to SonarQube
                    withSonarQubeEnv('sonar-server') {
                        sh """
                            ${SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectName='${params.PROJECT_NAME}' \
                            -Dsonar.projectKey='${params.PROJECT_NAME}' \
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



        stage('Security Scanning (Trivy)') {
            steps {
                sh "trivy fs . > trivyfs.txt"
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
                sh "trivy image ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest > trivyimage.txt" 
            }
        }

        stage('Deployment') {
            steps {
                sh 'docker stop ${params.DOCKER_IMAGE_NAME} || true'
                sh 'docker rm ${params.DOCKER_IMAGE_NAME} || true'
                sh 'docker run -d --name ${params.DOCKER_IMAGE_NAME} -p ${params.HOST_PORT}:${params.CONTAINER_PORT} ${params.DOCKER_USERNAME}/${params.DOCKER_IMAGE_NAME}:latest'
            }
        }
    }
}
