pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ping-client .'
            }
        }
        stage('Stop old container') {
            steps {
                sh 'docker rm ping-client --force'
            }
        }
        stage('Start New Container') {
            steps {
                sh 'docker run -p 3000:3000 -d --name ping-client ping-client'
            }
        }
    }
}