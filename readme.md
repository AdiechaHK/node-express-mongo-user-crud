# Basic User CRUD

This is a simple nodejs application using express that will demonstrate simple user crud operations.

This is just a assignment project.

### Pre-requisite
* node
* npm
* mongodb server / docker

### start database server using docker
```
docker run --name mongoserver -d mongo mongod
```

This will start you mongo server in detached mode, and to get it's IP address for connection you can run the follwing command

```
docker inspect mongoserver | grep IPAddress
```
This will give you ip address to be set in environment variable to set it up for local connect. 

### Steps to run the project.

**Clone reppo**
```
git clone git@github.com:AdiechaHK/node-express-mongo-user-crud.git
```

**Install dependancies**
```
cd node-express-mongo-user-crud # navigate to project folder
npm install # make sure you are using mode 12, as I've tested it on node 12
```

**Configure `.env` file.**
```
cp .env.example .env # to copy the .env file
```
Now you need to modify `.env` file as needed. currently 2 configurations are there, 
1. "port" to start node server
2. "connection string" to connect to mongo database.


**Start node server**
```
npm start
```

Now you can visit [http://localhost:3000](http://localhost:3000) see the running project.

