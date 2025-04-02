# final-proj

## docker container to store data

-- check the latest version of docker
-- `docker -v`
-- if docker is not install, please make sure to install a docker app

### Follow steps below to create postgres container for the CRUD app

1. Pull down a Dockerized Postgres image from the cloud
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
   -- `postgres --version`
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
   This should be same name as the database in the knexfile.js
10. Connect to newly create database
    -- `\c <database_name>`

Once tables are migrated and seeded, table will show up in the database

\*\*Exiting Shells
Use <CTRL>-D to exit the psql or Docker shell.
For Mac user, press `q`