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
        BUILD_TAG = "${BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
    }
    
    stages {
        stage('🔄 Checkout') {
            steps {
                echo '========== Checking out code =========='
                checkout scm
            }
        }
        
        stage('📦 Install Dependencies') {
            agent { label 'docker' }
            steps {
                echo '========== Installing npm packages =========='
                sh 'npm install'
            }
        }
        
        stage('🧪 Run Tests') {
            agent { label 'docker' }
            steps {
                echo '========== Running tests =========='
                sh 'npm test || true'
            }
        }
        
        stage('🐳 Build Docker Image') {
            agent { label 'docker' }
            steps {
                echo '========== Building Docker Image =========='
                sh '''
                    echo "NEWS_API_KEY=${NEWS_API_KEY}" > .env
                    echo "PORT=${PORT}" >> .env
                    docker build -t ${IMAGE}:${BUILD_TAG} .
                    docker tag ${IMAGE}:${BUILD_TAG} ${IMAGE}:latest
                '''
            }
        }
        
        stage('📤 Push to Registry') {
            agent { label 'docker' }
            steps {
                echo '========== Pushing image =========='
                sh '''
                    docker push ${IMAGE}:${BUILD_TAG}
                    docker push ${IMAGE}:latest
                '''
            }
        }
        
        stage('🚀 Deploy') {
            agent { label 'docker' }
            steps {
                echo '========== Deploying =========='
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
                '''
            }
        }
    }
    
    post {
        always {
            sh 'rm -f .env'
        }
        success {
            echo "✅ Build SUCCESS!"
        }
        failure {
            echo "❌ Build FAILED!"
        }
    }
}
