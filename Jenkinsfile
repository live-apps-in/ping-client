pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ping-client .'
            }
        }
        stage('Start New Container') {
            steps {
                echo 'docker run -p 3000:3000 -d --name ping-client ping-client'
            }
        }
    }
}