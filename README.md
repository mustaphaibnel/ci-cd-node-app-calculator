# Project Title

![Project Overview](images/overview.gif)

Brief description of your project: A fully implemented simple calculator API that exemplifies best practices and a full workflow in a CI/CD pipeline.

## Jenkins CI/CD Pipeline Stages

This section describes each stage of the Jenkins CI/CD pipeline for the project.


<table>
<thead>
<tr>
<th>Stage</th>
<th>Description</th>
<th>Screenshots</th>
</tr>
</thead>
<tbody>
<!-- Prepare Environment Stage -->
<tr>
<td><strong>Prepare Environment</strong></td>
<td>This stage prepares the environment for the build.</td>
<td>
<img src="images/prepare-environment-1.png" alt="Prepare Environment 1" width="200"/>
<img src="images/prepare-environment-2.png" alt="Prepare Environment 2" width="200"/>
</td>
</tr>

<!-- Checkout Code Stage -->
<tr>
<td><strong>Checkout Code</strong></td>
<td>This stage checks out the code from the GitHub repository.</td>
<td>
<img src="images/checkout-code-1.png" alt="Checkout Code 1" width="200"/>
<img src="images/checkout-code-2.png" alt="Checkout Code 2" width="200"/>
</td>
</tr>

<!-- Install Dependencies Stage -->
<tr>
<td><strong>Install Dependencies</strong></td>
<td>This stage installs the necessary dependencies for the project.</td>
<td>
<img src="images/install-dependencies-1.png" alt="Install Dependencies 1" width="200"/>
<img src="images/install-dependencies-2.png" alt="Install Dependencies 2" width="200"/>
</td>
</tr>

<!-- Run Tests and Coverage Stage -->
<tr>
<td><strong>Run Tests and Coverage</strong></td>
<td>This stage runs tests and generates coverage reports.</td>
<td>
<img src="images/run-tests-1.png" alt="Run Tests 1" width="200"/>
<img src="images/run-tests-2.png" alt="Run Tests 2" width="200"/>
</td>
</tr>

<!-- Generate HTML Coverage Report Stage -->
<tr>
<td><strong>Generate HTML Coverage Report</strong></td>
<td>This stage generates an HTML coverage report.</td>
<td>
<img src="images/generate-html-coverage-report-1.png" alt="Generate HTML Coverage Report 1" width="200"/>
<img src="images/generate-html-coverage-report-2.png" alt="Generate HTML Coverage Report 2" width="200"/>
</td>
</tr>

<!-- Publish Coverage Report Stage -->
<tr>
<td><strong>Publish Coverage Report</strong></td>
<td>This stage publishes the coverage report.</td>
<td>
<img src="images/publish-coverage-report-1.png" alt="Publish Coverage Report 1" width="200"/>
<img src="images/publish-coverage-report-2.png" alt="Publish Coverage Report 2" width="200"/>
</td>
</tr>

<!-- Code Quality Analysis Stage -->
<tr>
<td><strong>Code Quality Analysis (SonarQube)</strong></td>
<td>This stage analyzes the code quality using SonarQube.</td>
<td>
<img src="images/code-quality-analysis-1.png" alt="Code Quality Analysis 1" width="200"/>
<img src="images/code-quality-analysis-2.png" alt="Code Quality Analysis 2" width="200"/>
</td>
</tr>

<!-- Quality Analysis Gate Stage -->
<tr>
<td><strong>Quality Analysis Gate (SonarQube)</strong></td>
<td>This stage waits for the quality gate result from SonarQube.</td>
<td>
<img src="images/quality-analysis-gate-1.png" alt="Quality Analysis Gate 1" width="200"/>
<img src="images/quality-analysis-gate-2.png" alt="Quality Analysis Gate 2" width="200"/>
</td>
</tr>

<!-- Security Files Scanning Stage -->
<tr>
<td><strong>Security Files Scanning (Trivy)</strong></td>
<td>This stage scans security files using Trivy.</td>
<td>
<img src="images/trivy-file-scan.png" alt="Trivy File Scan" width="200"/>
<!-- Add another image if needed -->
</td>
</tr>

<!-- Security Benchmarking Stage -->
<tr>
<td><strong>Security Benchmarking (OWASP)</strong></td>
<td>This stage performs security benchmarking using OWASP.</td>
<td>
<img src="images/security-benchmarking-1.png" alt="Security Benchmarking 1" width="200"/>
<img src="images/security-benchmarking-2.png" alt="Security Benchmarking 2" width="200"/>
</td>
</tr>

<!-- Containerization Stage -->
<tr>
<td><strong>Containerization (Docker)</strong></td>
<td>This stage involves containerizing the application using Docker.</td>
<td>
<img src="images/containerization-1.png" alt="Containerization 1" width="200"/>
<img src="images/containerization-2.png" alt="Containerization 2" width="200"/>
</td>
</tr>

<!-- Container Security Scanning Stage -->
<tr>
<td><strong>Container Security Scanning (Trivy)</strong></td>
<td>This stage scans the Docker container for vulnerabilities using Trivy.</td>
<td>
<img src="images/trivy-container-scan.png" alt="Trivy Container Scan" width="200"/>
<!-- Add another image if needed -->
</td>
</tr>

<!-- Deployment Stage -->
<tr>
<td><strong>Deployment</strong></td>
<td>This stage handles the deployment of the application.</td>
<td>
<img src="images/deployment-1.png" alt="Deployment 1" width="200"/>
<img src="images/deployment-2.png" alt="Deployment 2" width="200"/>
</td>
</tr>
</tbody>
</table>

## Environment Variables and Parameters

To successfully run this Jenkins pipeline, specific environment variables and parameters need to be defined. These are used throughout the pipeline to customize the build and deployment process.

### Required Environment Variables:

- `SCANNER_HOME`: Specifies the home directory of the Sonar scanner.
- `MOCK_API_KEY` and `EXPECTED_API_KEY`: Used for API authentication during testing.
- Additional environment variables for Elastic APM as discussed earlier, like `APM_SERVICE_NAME`, `APM_SECRET_TOKEN`, and `APM_SERVER_URL`.

### Adjusting Pipeline Parameters:

The pipeline includes several parameters that you may need to adjust according to your environment:

- `GITHUB_URL`: URL of the GitHub repository.
- `BRANCH`: The branch to deploy.
- `PROJECT_NAME`, `DOCKER_USERNAME`, `DOCKER_IMAGE_NAME`: Used in the Dockerization stage.
- `CONTAINER_PORT`, `HOST_PORT`: Port configurations.
- `EMAIL_NOTIFICATION`: For sending build status emails.
- `JENKINS_URL`, `SONARQUBE_DASHBOARD_URL`, `API_END_POINT_URL`: Relevant URLs for the Jenkins server, SonarQube dashboard, and the API endpoint.

### Elastic APM Configuration:

To enable Elastic APM monitoring, set the following environment variables:

- `ELASTIC_APM_ACTIVE`: Set to `true` to activate Elastic APM.
- `APM_SERVICE_NAME`: The name of your service.
- `APM_SECRET_TOKEN`: Secret token for APM Server.
- `APM_SERVER_URL`: URL of the APM Server.

## GitHub Actions Integration

To trigger this Jenkins pipeline through GitHub Actions, you need to set up a GitHub Actions workflow. The workflow should include steps to invoke the Jenkins pipeline whenever code is pushed to the specified branch or when a pull request is made.

### Steps to Configure GitHub Actions:

1. **Create a Workflow File**: In your GitHub repository, create a new file under `.github/workflows` (e.g., `jenkins-trigger.yml`).
2. **Define Workflow Triggers**: Specify the events that will trigger the workflow, such as push or pull request.
3. **Add Steps to Invoke Jenkins Pipeline**: Use `curl` or a similar tool to trigger a build on the Jenkins server. You'll need to provide the Jenkins URL and authentication credentials (if required).
4. **Push the Workflow File**: Commit and push the workflow file to your repository.

## How to Use the Calculator API

(Include instructions on how to use the Calculator API, including available endpoints and example requests)

