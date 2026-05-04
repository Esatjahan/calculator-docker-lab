# Calculator Docker Lab

A multi-container Docker application for Lab 3.....

This project demonstrates how to build and run a simple calculator web application using Node.js and MongoDB with Docker Compose.

---

## Project Overview

The system consists of two services:

### 1. Web Service
- Built with Node.js and Express.js
- Provides a simple calculator interface
- Handles user input and calculations

### 2. Database Service
- MongoDB database
- Stores calculation history

When a user performs a calculation, the result is stored in MongoDB and displayed as history on the web interface.

---

## Technologies Used

- Docker
- Docker Compose
- Node.js
- Express.js
- MongoDB
- Mongoose

---

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

---

## Prerequisites

Make sure Docker and Docker Compose are installed.

```bash
docker --version
docker compose version
```

---

## Clone the Repository

```bash
git clone https://github.com/Esatjahan/calculator-docker-lab.git
cd calculator-docker-lab
```

---

## Run the Project

```bash
docker compose up --build
```

Or run in background:

```bash
docker compose up -d --build
```

Open in browser:

```text
http://localhost:3000
```

---

## Using the Application

Enter two numbers and select an operator.

Example:

```text
10 + 5 = 15
```

The result will:
- Be displayed on the screen
- Be saved in MongoDB
- Appear in calculation history

---

## Check Running Containers

```bash
docker ps
```

Expected:

```text
calculator_web
calculator_mongo
```

---

## Verify Database Storage

Enter MongoDB container:

```bash
docker exec -it calculator_mongo mongosh
```

Use database:

```javascript
use calculatorDB
```

Show stored data:

```javascript
db.calculations.find()
```

Exit:

```javascript
exit
```

If data appears, the web application is successfully connected to MongoDB.

---

## Stop the Project

```bash
docker compose down
```

---

## Restart the Project

```bash
docker compose up -d --build
```

Then open:

```text
http://localhost:3000
```

Previous data will still be available.

---

## Data Persistence

MongoDB uses a Docker volume:

```yaml
volumes:
  - mongo_data:/data/db
```

This ensures data remains even after restarting containers.

To remove all data:

```bash
docker compose down -v
```

---

## How Services Communicate

The web application connects to MongoDB using:

```text
MONGO_URL=mongodb://mongo:27017/calculatorDB
```

Here:
- `mongo` is the database service name
- Docker Compose provides internal networking between containers

---

## Lab Requirements Covered

- Docker installation
- Multi-container setup
- Web and database service separation
- Database integration
- Data persistence using volumes

---

## Repository

https://github.com/Esatjahan/calculator-docker-lab

