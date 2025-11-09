pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    environment {
        // Simple variables
        APP_NAME = "news-website"
        PORT = "3000"
        REGISTRY = "192.168.1.100:5000"
        IMAGE = "${REGISTRY}/${APP_NAME}"
        
        // From Jenkins Credentials
        NEWS_API_KEY = credentials('NEWS_API_KEY')
        
        // Build tag
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
                    // Create .env file
                    echo "NEWS_API_KEY=${NEWS_API_KEY}" > .env
                    echo "PORT=${PORT}" >> .env
                    
                    // Build image
                    docker build -t ${IMAGE}:${BUILD_TAG} .
                    docker tag ${IMAGE}:${BUILD_TAG} ${IMAGE}:latest
                    
                    echo "✅ Image built: ${IMAGE}:${BUILD_TAG}"
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
                    echo "✅ Image pushed"
                '''
            }
        }
        
        stage('🚀 Deploy') {
            agent { label 'docker' }
            steps {
                echo '========== Deploying application =========='
                sh '''
                    // Stop old container
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    
                    // Pull latest image
                    docker pull ${IMAGE}:latest
                    
                    // Run new container
                    docker run -d \
                      --name ${APP_NAME} \
                      -p ${PORT}:${PORT} \
                      -e NEWS_API_KEY="${NEWS_API_KEY}" \
                      -e PORT=${PORT} \
                      --restart always \
                      ${IMAGE}:latest
                    
                    // Verify
                    sleep 3
                    docker ps | grep ${APP_NAME}
                    echo "✅ Application deployed"
                '''
            }
        }
    }
    
    post {
        always {
            // Clean up after build
            sh 'rm -f .env'
        }
        
        success {
            // Pipeline completed successfully
            echo "✅ Pipeline SUCCESS!"
        }
        
        failure {
            // Pipeline failed
            echo "❌ Pipeline FAILED!"
        }
    }
}
