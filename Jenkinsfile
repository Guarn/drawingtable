pipeline {
    agent {
        docker {
            image 'guarn/drawingtable' 
            args '-p 3000:3000' 
        }
       
    }
    environment {
        CI = 'true'
        }
    stages {
        stage('Start') { 
            steps {
                sh 'npm start' 
            }
        }
        
    }
} 