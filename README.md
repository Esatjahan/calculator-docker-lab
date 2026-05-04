# Calculator Docker Lab

A multi-container Docker project for Lab 3.

This project contains a simple calculator web application using Node.js, Express.js, MongoDB, and Docker Compose.

## Project Overview

The system has two services:

1. **Web Service**
   - Node.js
   - Express.js
   - Calculator web application

2. **Database Service**
   - MongoDB
   - Stores calculation history

When a user performs a calculation from the browser, the Node.js web application calculates the result and saves it into MongoDB. The web application also retrieves previous calculations from MongoDB and displays them as history.

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
```

## Step 1: Install Docker

Update package list:

```bash
sudo apt update
```

Install required packages:

```bash
sudo apt install ca-certificates curl gnupg -y
```

Install Docker:

```bash
sudo apt install docker.io docker-compose-plugin -y
```

Check Docker version:

```bash
docker --version
```

Check Docker Compose version:

```bash
docker compose version
```

If Docker permission error occurs, run:

```bash
sudo usermod -aG docker $USER
```

Then restart the system:

```bash
sudo reboot
```

## Step 2: Clone This Repository

```bash
git clone https://github.com/Esatjahan/calculator-docker-lab.git
```

Go inside the project folder:

```bash
cd calculator-docker-lab
```

## Step 3: Run the Project

Run with build:

```bash
docker compose up --build
```

Or run in background:

```bash
docker compose up -d --build
```

Open the application in browser:

```text
http://localhost:3000
```

## Step 4: Use the Calculator

Example:

```text
10 + 5 = 15
```

After submitting a calculation, the result is saved into MongoDB and shown in the calculation history section.

## Step 5: Check Running Containers

```bash
docker ps
```

Expected containers:

```text
calculator_web
calculator_mongo
```

## Step 6: Verify MongoDB Data

Enter the MongoDB container:

```bash
docker exec -it calculator_mongo mongosh
```

Select the database:

```javascript
use calculatorDB
```

Show saved calculations:

```javascript
db.calculations.find()
```

Exit MongoDB shell:

```javascript
exit
```

If saved calculations appear here, it proves that the web application is connected with the MongoDB database.

## Step 7: Stop the Project

```bash
docker compose down
```

This stops the containers but does not delete the database data.

## Step 8: Restart the Project

```bash
docker compose up -d --build
```

Then open again:

```text
http://localhost:3000
```

Previous calculation history should still be available.

## Step 9: Data Persistence Explanation

MongoDB data is stored using a Docker volume.

In `docker-compose.yml`:

```yaml
volumes:
  - mongo_data:/data/db
```

Because of this volume, data remains saved even after stopping and restarting the containers.

To stop containers without deleting data:

```bash
docker compose down
```

To delete containers and database data completely:

```bash
docker compose down -v
```

## How Web App Connects with MongoDB

In `docker-compose.yml`, the web service connects to MongoDB using this environment variable:

```text
MONGO_URL=mongodb://mongo:27017/calculatorDB
```

Here, `mongo` is the MongoDB service name. Docker Compose creates a private network where the web container can communicate with the database container using this service name.

## Lab Requirement Fulfilled

- Docker installed
- Web application container created
- Database container created
- Web app connected with database
- Data stored in MongoDB
- Data retrieved from MongoDB
- Data persists after container restart

## Teacher Explanation

This is a multi-container Docker application. The first container runs the Node.js calculator web application, and the second container runs MongoDB. Docker Compose manages both containers together. The calculator result is stored in MongoDB using Mongoose. The web application also retrieves saved calculations from MongoDB and displays them as history. MongoDB data persists because a Docker volume is used.
