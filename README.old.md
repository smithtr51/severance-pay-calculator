# severance-pay-calculator
Severance Pay Calculator

Overview

This project is a Severance Pay Calculator built with React and deployed on AWS Amplify. The application calculates severance pay based on employee input, considering factors such as years of service, additional months, age, and other adjustments.

Features

User-friendly UI built with React

Real-time severance pay calculations

Deployed using AWS Amplify for scalability

Backend API (optional) using AWS Lambda and API Gateway

Tech Stack

Frontend: React.js (Vite for performance optimization)

Backend (optional): Node.js/Express or Python/Flask (AWS Lambda)

Hosting & Deployment: AWS Amplify

CI/CD: GitHub Actions for automated deployment

Setup Instructions

Prerequisites

Node.js installed (Download Node.js)

AWS CLI installed (AWS CLI Setup)

GitHub account for repository hosting

Clone Repository

 git clone https://github.com/yourusername/severance-pay-calculator.git
 cd severance-pay-calculator

Install Dependencies

npm install

Run Locally

npm run dev

This will start the application on http://localhost:3000.

Deploy to AWS

1. Initialize AWS Amplify

amplify init

Follow the CLI prompts to configure the project.

2. Deploy to AWS

amplify publish

This will deploy your frontend to an AWS Amplify-hosted domain.

API (Optional Backend)

If a backend API is required, deploy a Lambda function with API Gateway:

Create API with AWS Lambda

amplify add function

Deploy API

amplify push

CI/CD with GitHub Actions

To automate deployments, add the following GitHub Actions workflow (.github/workflows/deploy.yml):

name: Deploy to AWS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2
      - name: Install Dependencies
        run: npm install
      - name: Build React App
        run: npm run build
      - name: Deploy to AWS Amplify
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 sync build/ s3://your-s3-bucket --delete
          aws cloudfront create-invalidation --distribution-id YOUR_CLOUDFRONT_ID --paths "/*"

Accessing the Application

Once deployed, access the application at:

https://your-app.amplifyapp.com

Contributing

Fork the repository.

Create a new feature branch (git checkout -b feature-branch).

Commit changes (git commit -m "Add feature").

Push to the branch (git push origin feature-branch).

Create a Pull Request.

License

This project is licensed under the MIT License. See LICENSE for details.

🚀 Happy Coding!

