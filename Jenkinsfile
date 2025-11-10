pipeline {
    agent none  // Disable global agent, assign per stage

    triggers {
        githubPush()
    }

    environment {
        APP_NAME = "news-website"
        PORT = "3000"
        NEWS_API_KEY = credentials('NEWS_API_KEY')
        BUILD_TAG = "${BUILD_NUMBER}"
        SONARQUBE_PROJECT_KEY = "news-website"
    }

    stages {
        stage(' Checkout') {
            agent any
            steps {
                echo 'Checking out code'
                checkout scm
                sh 'git log --oneline -1'
            }
        }

        stage(' SonarQube Analysis') {
            agent any
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'  // Name exactly as shown in your Jenkins tools
                    echo 'Running SonarQube Analysis'
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${SONARQUBE_PROJECT_KEY} \
                            -Dsonar.sources=. \
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            agent { label 'docker' }
            steps {
                echo ' Building Docker Image'
                sh """
                    echo "NEWS_API_KEY=${NEWS_API_KEY}" > .env
                    docker build -t ${APP_NAME}:${BUILD_TAG} .
                    docker tag ${APP_NAME}:${BUILD_TAG} ${APP_NAME}:latest
                    echo "Image built: ${APP_NAME}:${BUILD_TAG}"
                """
            }
        }

        stage(' Deploy') {
            agent { label 'docker' }
            steps {
                echo ' Deploying Application'
                sh """
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker run -d \
                      --name ${APP_NAME} \
                      -p ${PORT}:${PORT} \
                      -e NEWS_API_KEY="${NEWS_API_KEY}" \
                      -e PORT=${PORT} \
                      --restart always \
                      ${APP_NAME}:latest
                    sleep 3
                    docker ps | grep ${APP_NAME}
                    echo "Application deployed on port ${PORT}"
                """
            }
        }
    }

    post {
        always {
            node('docker') {
                cleanWs()
            }
        }
        success {
            echo " BUILD SUCCESS!"
            echo "App running at: http://52.71.5.19:${PORT}/api/news"
        }
        failure {
            echo "BUILD FAILED!"
        }
    }
}
