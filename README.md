# Project Title

![Project Overview](images/overview.gif)

Brief description of your project: A fully implemented simple calculator API that exemplifies best practices and a full workflow in a CI/CD pipeline.

## Jenkins CI/CD Pipeline Stages

This section describes each stage of the Jenkins CI/CD pipeline for the project, showcasing the various stages from code checkout to deployment, ensuring code quality, security, and seamless integration and delivery.

### Prepare Environment
This stage prepares the environment for the build.
<table>
  <tr>
    <td>
      <img src="images/prepare-environment-1.png" alt="Prepare Environment Step 1" width="400"/>
      <p>Prepare Environment Step 1</p>
    </td>
    <td>
      <img src="images/prepare-environment-2.png" alt="Prepare Environment Step 2" width="400"/>
      <p>Prepare Environment Step 2</p>
    </td>
  </tr>
</table>

### Checkout Code
This stage checks out the code from the GitHub repository.
<table>
  <tr>
    <td>
      <img src="images/checkout-code-1.png" alt="Checkout Code" width="400"/>
      <p>Checkout Code</p>
    </td>
    <td>
      <!-- Placeholder for second image if needed -->
    </td>
  </tr>
</table>

### Install Dependencies
This stage installs the necessary dependencies for the project.
<table>
  <tr>
    <td>
      <img src="images/install-dependencies-1.png" alt="Install Dependencies" width="400"/>
      <p>Install Dependencies</p>
    </td>
    <td>
      <!-- Placeholder for second image if needed -->
    </td>
  </tr>
</table>

### Run Tests and Coverage
This stage runs tests and generates coverage reports.
<table>
  <tr>
    <td>
      <img src="images/run-tests-1.png" alt="Run Tests" width="400"/>
      <p>Run Tests</p>
    </td>
    <td>
      <!-- Placeholder for second image if needed -->
    </td>
  </tr>
</table>

### Generate HTML Coverage Report
This stage generates an HTML coverage report.
<table>
  <tr>
    <td>
      <img src="images/generate-html-coverage-report-1.png" alt="Generate HTML Coverage Report Step 1" width="400"/>
      <p>Generate HTML Coverage Report Step 1</p>
    </td>
    <td>
      <img src="images/generate-html-coverage-report-2.png" alt="Generate HTML Coverage Report Step 2" width="400"/>
      <p>Generate HTML Coverage Report Step 2</p>
    </td>
  </tr>
</table>

### Publish Coverage Report
This stage publishes the coverage report.
<table>
  <tr>
    <td>
      <img src="images/publish-coverage-report-1.png" alt="Publish Coverage Report" width="400"/>
      <p>Publish Coverage Report</p>
    </td>
    <td>
      <!-- Placeholder for second image if needed -->
    </td>
  </tr>
</table>


### Code Quality Analysis (SonarQube)
This stage analyzes the code quality using SonarQube.
<table>
  <tr>
    <td>
      <img src="images/code-quality-analysis-1.png" alt="Code Quality Analysis Step 1" width="400"/>
      <p>Code Quality Analysis Step 1</p>
    </td>
    <td>
      <img src="images/code-quality-analysis-2.png" alt="Code Quality Analysis Step 2" width="400"/>
      <p>Code Quality Analysis Step 2</p>
    </td>
  </tr>
</table>

### Quality Analysis Gate (SonarQube)
This stage waits for the quality gate result from SonarQube.
<table>
  <tr>
    <td>
      <img src="images/quality-gate-1.png" alt="Quality Gate Step 1" width="400"/>
      <p>Quality Gate Step 1</p>
    </td>
    <td>
      <img src="images/quality-gate-2.png" alt="Quality Gate Step 2" width="400"/>
      <p>Quality Gate Step 2</p>
    </td>
  </tr>
</table>

### Security Files Scanning (Trivy)
This stage scans security files using Trivy.
<table>
  <tr>
    <td>
      <img src="images/trivy-file-scan-1.png" alt="Trivy File Scan" width="400"/>
      <p>Trivy File Scan</p>
    </td>
    <td>
      <img src="images/trivy-file-scan-2.png" alt="Trivy File Scan" width="400"/>
      <p>Trivy File Scan</p>
    </td>
  </tr>
</table>

### Security Benchmarking (OWASP)
This stage performs security benchmarking using OWASP.
<table>
  <tr>
    <td>
      <img src="images/owasp-benchmark-1.png" alt="OWASP Benchmark Step 1" width="400"/>
      <p>OWASP Benchmark Step 1</p>
    </td>
    <td>
      <img src="images/owasp-benchmark-2.png" alt="OWASP Benchmark Step 2" width="400"/>
      <p>OWASP Benchmark Step 2</p>
    </td>
  </tr>
</table>

### Containerization (Docker)
This stage involves containerizing the application using Docker.
<table>
  <tr>
    <td>
      <img src="images/containerization-1.png" alt="Containerization Step 1" width="400"/>
      <p>Containerization Step 1</p>
    </td>
    <td>
      <img src="images/containerization-2.png" alt="Containerization Step 2" width="400"/>
      <p>Containerization Step 2</p>
    </td>
  </tr>
</table>

### Container Security Scanning (Trivy)
This stage scans the Docker container for vulnerabilities using Trivy.
<table>
  <tr>
    <td>
      <img src="images/trivy-container-scan-1.png" alt="Trivy Container Scan Step 1" width="400"/>
      <p>Trivy Container Scan Step 1</p>
    </td>
    <td>
      <img src="images/trivy-container-scan-2.png" alt="Trivy Container Scan Step 2" width="400"/>
      <p>Trivy Container Scan Step 2</p>
    </td>
  </tr>
</table>

### Deployment
This stage handles the deployment of the application.
<table>
  <tr>
    <td>
      <img src="images/deployment-1.png" alt="Deployment Step 1" width="400"/>
      <p>Deployment Step 1</p>
    </td>
    <td>
      <img src="images/deployment-2.png" alt="Deployment Step 2" width="400"/>
      <p>Deployment Step 2</p>
    </td>
  </tr>
</table>

## Post-Deployment Activities

### Email Notifications
The pipeline is configured to send email notifications upon completion of the build process, providing information on the build status, including success or failure notifications.
<table>
  <tr>
    <td>
      <img src="images/email-notification-1.png" alt="Email Notification" width="400"/>
      <p>Email Notification Example</p>
    </td>
    <!-- Add more images if necessary -->
  </tr>
</table>

### Swagger Documentation
The API is documented with Swagger, offering an interactive interface for exploring the API endpoints and their responses.
<table>
  <tr>
    <td>
      <img src="images/swagger-documentation-1.png" alt="Swagger Documentation" width="400"/>
      <p>Swagger API Documentation</p>
    </td>
    <!-- Add more images if necessary -->
  </tr>
</table>

### Postman Testing
A Postman collection is available for testing the API endpoints. This collection can be used to understand and validate the request/response flow of the API.
<table>
  <tr>
    <td>
      <img src="images/postman-testing.png" alt="Postman Testing" width="400"/>
      <p>Postman API Testing</p>
    </td>
    <!-- Add more images if necessary -->
  </tr>
</table>

### Docker Container Monitoring
Docker containers are monitored to ensure they are running as expected. This includes monitoring resource usage, uptime, and health status.
<table>
  <tr>
    <td>
      <img src="images/docker-monitoring-1.png" alt="Docker Container Monitoring" width="400"/>
      <p>Docker Container Monitoring(Elastic Stack)</p>
    </td>
    <img src="images/docker-monitoring-2.png" alt="Docker Container Monitoring" width="400"/>
      <p>Docker Container Monitoring(Portainer)</p>
  </tr>
</table>

### Application Performance Monitoring
The application is monitored using tools like Elastic APM, providing insights into performance metrics, error rates, and response times. This helps in understanding the application behavior under various conditions.
<table>
  <tr>
    <td>
      <img src="images/apm-monitoring.png" alt="Application Performance Monitoring" width="400"/>
      <p>Application Performance Monitoring</p>
    </td>
    <!-- Add more images if necessary -->
  </tr>
</table>

## Environment Variables and Parameters

[Include the section as previously provided]

## GitHub Actions Integration

[Include the section as previously provided]

## How to Use the Calculator API

Provide detailed instructions on how to interact with the calculator API, including example requests and responses for each endpoint.

## Post-Deployment Activities

[Include sections on Email Notifications, Manual Testing, Stress Testing and API Testing, Monitoring with Elastic APM]

## Stack Implementation Details

[Include details on the technology stack]
