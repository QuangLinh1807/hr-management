pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                sh 'sudo npm install'
            }
        }
        stage('Build source code') {
            steps {
                sh 'sudo npm run build'
            }
        }
    }
}