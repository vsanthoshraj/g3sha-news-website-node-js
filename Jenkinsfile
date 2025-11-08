pipeline {
    agent {
        node {
            label 'docker'  // Runs on Docker Builder EC2
        }
    }
    
    environment {
        NEWS_API_KEY = credentials('NEWS_API_KEY')
        SONARQUBE_TOKEN = credentials('sonarqube-token')
        DOCKER_IMAGE = 'news-website:latest'
    }
    
    stages {
        stage('1. Checkout') {
            steps {
                echo 'Stage 1: Cloning repository...'
                checkout scm
            }
        }
        
        stage('2. Install Dependencies') {
            steps {
                echo 'Stage 2: Installing npm dependencies...'
                sh 'npm install'
            }
        }
        
        stage('3. SonarQube Analysis') {
            steps {
                echo 'Stage 3: Running SonarQube analysis...'
                sh '''
                    sonar-scanner \
                      -Dsonar.projectKey=news-website \
                      -Dsonar.projectName="G3sha News Website" \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://YOUR_SONARQUBE_IP:9000 \
                      -Dsonar.login=${SONARQUBE_TOKEN} \
                      -Dsonar.exclusions=node_modules/**,public/**/*.min.js
                '''
            }
        }
        
        stage('4. Docker Builder - Build Image') {
            steps {
                echo 'Stage 4: Building Docker image...'
                sh '''
                    docker build \
                      --build-arg NEWS_API_KEY=${NEWS_API_KEY} \
                      -t ${DOCKER_IMAGE} .
                '''
            }
        }
        
        stage('5. Test Docker Image') {
            steps {
                echo 'Stage 5: Testing Docker image...'
                sh 'docker run --rm ${DOCKER_IMAGE} node -v'
                sh 'docker run --rm ${DOCKER_IMAGE} npm -v'
            }
        }
        
        stage('6. Docker Image Ready') {
            steps {
                echo 'Stage 6: Docker Image Ready ✓'
                echo "Image: ${DOCKER_IMAGE}"
                sh 'docker images | grep news-website'
            }
        }
    }
    
    post {
        success {
            echo '✓ Pipeline completed successfully!'
            echo "✓ Docker image ready: ${DOCKER_IMAGE}"
            echo "✓ Can deploy to production now"
        }
        failure {
            echo '✗ Pipeline failed!'
            echo 'Check console output for errors'
        }
    }
}
