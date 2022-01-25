# secret-santa
Secret Santa web application using Node JS, React and SQLite

## Install the app
```bash
$ npm install
```

## Run the app
```bash
$ npm run start
```

## The app runs on port 9000
```bash
http://localhost:9000
```

## API
### USERS
POST: **http://localhost:9000/users**

BODY : 
```bash
{
    "firstname": string,
    "lastname": string,
    "wishes": string[]
}
```

GET: **http://localhost:9000/users**

GET: **http://localhost:9000/users/:id**

POST: **http://localhost:9000/users/shuffle**

### SANTAS
GET: **http://localhost:9000/santas**

GET: **http://localhost:9000/santas/:id**

### WISHES
GET: **http://localhost:9000/wishes**


