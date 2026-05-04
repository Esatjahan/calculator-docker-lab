# Calculator Docker Lab

This is a multi-container Docker application created for Lab 3.

## Project Overview

This project contains a simple calculator web application using Node.js and MongoDB.

The system has two services:

1. Web Service - Node.js and Express calculator application
2. Database Service - MongoDB database

The web application takes two numbers and an operator from the user, calculates the result, stores the result in MongoDB, and shows the previous calculation history.

## Technologies Used

- Docker
- Docker Compose
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
calculator-docker-lab/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
├── .gitignore
└── README.md
git clone https://github.com/Esatjahan/calculator-docker-lab.git
cd calculator-docker-lab
