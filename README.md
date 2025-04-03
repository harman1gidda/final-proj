# final-proj

## docker container to store data

-- check the latest version of docker
-- `docker -v`
-- if docker is not install, please make sure to install a docker app

### Follow steps below to create postgres container for the CRUD app

1. Skip this step if postgress image already exists. Check docker app under images to verify. If image does not exist, Pull down a Dockerized Postgres image from the cloud
   -- `docker pull postgres`
2. Create the directories that will house your database data:
   -- `mkdir -p $HOME/docker/volumes/postgres`
   -p mean create parent folders
3. Start up a Docker Postgres container instance of the image that you pulled.
   -- `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
   --rm: remove the contaoner when stopped
   --name: gives explicit name
   -e: this is enviornmental variable
   -PASSWORD: use this to connect to the databasedocker
   -d: run detached state
   -p: port mapping. exposing a port and mapping to container default port of 5432
   -v: map the volume that created in previous cmd to /var... which is the default storage in the docker
   -postgres: is the image to use

- at this point, container id would be displayed and created

4. List all Docker images that are currently running:
   -- `docker ps -a`
5. Switch to the Docker image's shell with the container id you see from running the above in your terminal. Then, verify your version of Postgres. Make sure to replace <PSQL-Container-ID> with the id from the previous command output:
   -- `docker exec -it <PSQL-Container-ID> bash`
6. Verify the latest version of PostgreSQL was installed correctly by running the following commands:
   -- `psql --version`
7. Log in to the psql (Postgres) shell with the default postgres user:
   -- `psql -U postgres`
   -- -U: is the user and postgress is the default user
   -- `\list` to see all the datbases
8. Now you can write SQL queries in the command line. Invoke this function to show your Postgres version:
   -- `SELECT version();`

9. Create database
   -- `CREATE DATABASE <database_name>;`
   This should be same name as the database in the knexfile.js. For this application, create `harmandb` as the database.
10. Connect to newly create database
    -- `\c <database_name>`
11. Navigate to the terminal in the VS Code and `cd api`

- once in the folder, follow steps to migrate and seed the dummy tables.

Once tables are migrated and seeded, table will show up in the database

\*\*Exiting Shells
Use <CTRL>-D to exit the psql or Docker shell.
For Mac user, press `q`

- check what tables exist
  `\dt`

---

- in the terminal, run following
  `npm install`
  -- `npm start`
- You should see console.log in the terminal and info displayed on the localhost:{port}

- once the server is running, next step is to migrate and seed the data

- Open another terminal in VS code and cd into api
- Run
  -- `npx knex migrate:latest`

  > table should be populated in the database. run following in the same terminal where you connected to the datatbase to check
  > -- `SELECT * FROM knex_migrations;`

- Run following command to seed the data into the table
  -- `npx knex seed:run`
- To rollback database
  -- `npx knex migrate:rollback`

- To all tables
  `\dt`
- TO see what data is seed in each table
  `SELECT * FROM <table-name>;`
- Try above command for users table and you will see hash passwords for users in the table. For ease, existing username and password are listed below:
  username: JKelly
  password: cat

username: JHadock
password: bird

username: MWegenke
password: dog

- New users can be created in the frontend REAT app under Sign Up section

---

# Front End Set-up

1. Open terminal in the VS Code and `cd ui`and run `npm install`.
2. Run `npm run dev` and frontend is running.

- Navigate to README.md under ui folder to learn how to spin up a REACT app.

3. open the app in the chrome browser. You should see Home Page with
   - Home
   - All Items
   - Sign Up
   - Log In

Currently, you are visitng the site as aGuest and it is displayed on the Home Page

4. Click on Log in and sign it will once of the existing username and password

- User is logged in and username is displayed
- User is navigated to the My Items page

#### Log in satisfy USER Story 2

As an inventory manager I want to be able to log into my account so that I can see my inventory of items.

- After logging in, the inventory manager should be redirected to their inventory of items

5. Create new user

- Click Sign up on the navbar
- Add requested credentials
- Check the terminal where you conncected to the database and run `SELECT * FROM users;` to see new user with hashed passwords.
- Log in with the new user info

#### Create New User satisfy USER Story 1

As an inventory manager I want to be able to create an account so that I can track my inventory.

6. Add new items under My Items Tab

- under My Items tab, enter following:

  - Item name
  - Description
  - Quantity

  #### Add new item(s) satisfy USER Story 3

  As an inventory manager I want to be able to create a new item so that I can share my item details with the world.

      - After the item is created, the inventory manager should be redirected to their inventory of items.
      - An item displays name, description, and quantity.

  #### My Items tab satisfy USER Story 4

  As an inventory manager I want to be able to see a my entire inventory of items.

      - The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.

  #### My Items tab satisfy USER Story 5

  As an inventory manager I want to be able to see any individual item I have added. - The full item information should be displayed.

6. Edit Items

   - Under My Items tab, click edit button to make changes
   - New dialog box will open and changes can be make.

   #### Edit Items satisfy USER Story 6

   As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.

   - When the user toggles edit mode, the page remains the same and the fields become editable.

7. Delete Item

   - Under My Items tab, click delete button to remove the item.

   #### Delete Items satisfy USER Story 7

   As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.

   - When the user deletes the item they should be redirected to their inventory of items.

8. All Items tab

   - ALl items are display from all users.

   #### All Items tab satisfy USER Story 8

   As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.

   - Unauthenticated users should be able to view all items, and any single item.
   - The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.

   #### All Items tab satisfy USER Story 9

   As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.

   - Unauthenticated users should be able to view all items, and any single item.

   #### All Items tab satisfy USER Story 10

   As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.

   - Unauthenticated users should be able to view all items, and any single item
