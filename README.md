# Final Project 🚀

This project demonstrates a complete CRUD application running in Docker containers using PostgreSQL for data storage and a React front-end for user interaction. The application enables inventory managers to sign up, log in, create, view, edit, and delete inventory items.

---

### 📌 Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js installed (if running locally without Docker).
- The following npm packages:
  - `create-vite@latest`
  - `react-router-dom`
  - `express`
  - `knex`
  - `pg`
  - `cors`
  - `bcrypt`
  - `cookie-parser`
  - `nodemon`

---

## Overview

- **Docker Container for Data Storage** 🐳
  A Dockerized PostgreSQL container isolates your database and makes it easily portable.

- **Back-End Setup**
  A Node.js/Express back-end performs CRUD operations using [Knex.js](http://knexjs.org) with PostgreSQL.

- **Front-End Setup**
  A React application provides a user-friendly interface for inventory managers to manage their items.

---

## 🛠️ Docker & PostgreSQL Setup

### 1. Verify Docker Installation

- **Check Docker Version:**
  ```bash
  docker -v
  ```
- If Docker is not installed, please install Docker Desktop or your preferred Docker engine.

### 2. Set Up Dockerized PostgreSQL

1. Pull the PostgreSQL Image:
   Skip if you already have the PostgreSQL image

```bash
docker pull postgres
```

2. Create a Directory for Database Data:
   Create the necessary directory to persist your PostgreSQL data:

```bash
mkdir -p $HOME/docker/volumes/postgres
```

(-p ensures that all parent directories are created if needed.)

3. Start the PostgreSQL Container:
   Run the container:

```bash
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
```

--rm: Remove the container when it stops.
--name: Assigns an explicit name.
-e: Sets environmental variables.
-PASSWORD: Use this to connect to the databasedocker
-d: Runs the container in detached mode.
-p: Maps port 5432 on your machine to port 5432 on the container.
-v: Mounts the host directory to the container's data directory.

4. Verify Running Containers:

   ```bash
   docker ps -a
   ```

5. Access the Container Shell:
   Replace <PSQL-Container-ID> with your container ID:

```bash
docker exec -it <PSQL-Container-ID> bash
```

6. Verify PostgreSQL Installation:

```bash
psql --version
```

7. Log In to the PostgreSQL Shell:

```bash
psql -U postgres
```

Then run `\list` to see available databases.

8. Check PostgreSQL Version:

```bash
SELECT version();
```

9. Create database:
   Create a database matching your `knexfile.js` configuration. For this application:

```bash
CREATE DATABASE <database_name>;
```

For this application, create `harmandb` as the database.

10. Connect to newly create database

```bash
\c <database_name>
```

11. Verify Tables:
    Run `\dt` to list all tables.

---

## 🛠️ Back-End Setup

1. Navigate to the API Folder:

```bash
cd api
```

2. Install Dependencies & Start the Server:

```bash
npm install
npm start
```

The console should log server details, and the back-end will run on localhost:<port>.

3. Database Migrations and Seeding:

   - Migrate Tables:

   ```bash
   npx knex migrate:latest
   ```

   Verify migrations with:

   ```bash
   SELECT * FROM knex_migrations;
   ```

   - Seed Data:

   ```bash
   npx knex seed:run
   ```

   - Rollback:

   ```bash
   npx knex migrate:rollback
   ```

4. Test Your Database:
   In the psql shell, run:

```bash
\dt
SELECT * FROM users;
```

- Existing user credentials:

Username: JKelly | Password: cat

Username: JHadock | Password: bird

Username: MWegenke | Password: dog

New users can be created via the Sign Up page.

---

## ⚡ Front-End Setup

1. Navigate to the UI Folder:

```bash
cd ui
npm install
```

2. Start the Front-End Development Server:

```bash
npm run dev
```

3. Open the Application in Your Browser:
   You should see a Home Page with navigation options:

   - Home
   - All Items
   - Sign Up
   - Log In
     Initially, you'll be visiting the site as a guest.

4. Log In:
   Click Log In and use one of the existing credentials. Your username will be displayed on the Home Page, and you'll be redirected to the My Items page.

---

### 🌍 Front-End Detailed Instructions

1. Log In:
   Use existing credentials to log in. Your username will display on the Home Page, and you'll be redirected to My Items.

2. Create a New User:
   Use the Sign Up section on the navbar to create a new account. Check your database `SELECT * FROM users;` to verify the new user.

3. Add New Items:
   Under My Items, fill in:

   - Item Name
   - Description
   - Quantity
     After submission, you'll be redirected to your inventory.

4. Edit & Delete Items:
   Use the edit and delete buttons under My Items to modify or remove items.

5. All Items:
   As a visitor, browse all items created by inventory managers. Click an item to see full details.

---

## 🤝 Contributing

Feel free to fork this repository and create pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## 🧑‍💻 Authors

- Harman Gidda

---

## 📄 License

This project is licensed under the MIT License.
