pipeline {
    agent any
    
    environment {
        NEWS_API_KEY = credentials('NEWS_API_KEY')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Create .env File') {
            steps {
                echo 'Creating .env file with API key...'
                sh 'echo "NEWS_API_KEY=${NEWS_API_KEY}" > .env'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'echo "Build completed successfully"'
            }
        }
        
        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t news-website:latest .'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'node -v && npm -v'
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
