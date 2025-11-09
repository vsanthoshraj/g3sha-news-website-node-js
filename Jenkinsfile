pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        APP_NAME = "news-website"
        PORT = "3000"
        REGISTRY = "YOUR_EC2_3_IP:5000"
        IMAGE = "${REGISTRY}/${APP_NAME}"
        NEWS_API_KEY = credentials('NEWS_API_KEY')
        BUILD_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('🔄 Checkout') {
            steps {
                echo '========== Checking out code =========='
                checkout scm
                sh 'git log --oneline -1'
            }
        }
        
        stage('🐳 Build Docker Image') {
            steps {
                echo '========== Building Docker Image =========='
                sh '''
                    echo "NEWS_API_KEY=${NEWS_API_KEY}" > .env
                    docker build -t ${IMAGE}:${BUILD_TAG} .
                    docker tag ${IMAGE}:${BUILD_TAG} ${IMAGE}:latest
                    echo "✅ Image built: ${IMAGE}:${BUILD_TAG}"
                '''
            }
        }
        
        stage('📤 Push to Registry') {
            steps {
                echo '========== Pushing to Registry =========='
                sh '''
                    docker push ${IMAGE}:${BUILD_TAG}
                    docker push ${IMAGE}:latest
                    echo "✅ Image pushed"
                '''
            }
        }
        
        stage('🚀 Deploy') {
            steps {
                echo '========== Deploying Application =========='
                sh '''
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker pull ${IMAGE}:latest
                    docker run -d \
                      --name ${APP_NAME} \
                      -p ${PORT}:${PORT} \
                      -e NEWS_API_KEY="${NEWS_API_KEY}" \
                      -e PORT=${PORT} \
                      --restart always \
                      ${IMAGE}:latest
                    sleep 3
                    docker ps | grep ${APP_NAME}
                    echo "✅ Application deployed"
                '''
            }
        }
    }
    
    post {
        always {
            sh 'rm -f .env'
        }
        
        success {
            echo "✅ BUILD SUCCESS!"
        }
        
        failure {
            echo "❌ BUILD FAILED!"
        }
    }
}
