pipeline {
    agent any
    
    environment {
        // Get API key from Jenkins Credentials
        NEWS_API_KEY = credentials('NEWS_API_KEY')
        DOCKER_REGISTRY = "EC2_3_IP:5000"
        DOCKER_IMAGE = "${DOCKER_REGISTRY}/news-website"
        BUILD_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('🔄 Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('📦 Install Dependencies') {
            agent { label 'docker' }
            steps {
                sh 'npm install'
            }
        }
        
        stage('🐳 Build Docker Image') {
            agent { label 'docker' }
            steps {
                sh '''
                    # IMPORTANT: Create .env with API key
                    echo "NEWS_API_KEY=${NEWS_API_KEY}" > .env
                    echo "PORT=3000" >> .env
                    
                    # Build image
                    docker build -t ${DOCKER_IMAGE}:${BUILD_TAG} .
                    docker tag ${DOCKER_IMAGE}:${BUILD_TAG} ${DOCKER_IMAGE}:latest
                '''
            }
        }
        
        stage('📤 Push to Registry') {
            agent { label 'docker' }
            steps {
                sh '''
                    docker push ${DOCKER_IMAGE}:${BUILD_TAG}
                    docker push ${DOCKER_IMAGE}:latest
                '''
            }
        }
        
        stage('🚀 Deploy') {
            agent { label 'docker' }
            steps {
                sh '''
                    # Stop old container
                    docker stop news-website || true
                    docker rm news-website || true
                    
                    # Pull image
                    docker pull ${DOCKER_IMAGE}:latest
                    
                    # Run container WITH API KEY ⭐
                    docker run -d \
                      --name news-website \
                      -p 3000:3000 \
                      -e NEWS_API_KEY="${NEWS_API_KEY}" \
                      -e PORT=3000 \
                      --restart always \
                      ${DOCKER_IMAGE}:latest
                    
                    sleep 3
                    docker ps | grep news-website
                '''
            }
        }
    }
    
    post {
        always {
            sh 'rm -f .env'  # Clean up after build
        }
    }
}
