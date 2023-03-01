# MVP Nugget your Event - Project 

## The idea
Nugget your event is a web app to help you and your friend to organise activities/meeting for fun. At the moment, the main focus and big work is on the Admin user (the organisers) but hope that the user can also has more priviledge in the app.

## Setup
### Dependencies
 - Run `npm install` in project directory. This will install server-related dependencies such as express.
 - `cd client` and `run npm install`. This will install client dependencies (React).

## Database Prep
Access the MySQL interface in your terminal by running mysql -u root -p
Create a new database called facebook: create database facebook
Add a .env file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:
```
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=event
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository (my-express-app), in a new terminal window. 

- Make sure you understand how the `keyInfo` and `activities` tables are constructed and connected to each other. There's a 3rd table `votes` but not in use yet.
In your MySQL console, you can run `use event;` and then `describe keyInfo;`, `describe activities;` and `describe votes;`  to see the structure of those tables.

### Development
- Run `npm start` in project directory to start the Express server on port 5001
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## About my codes

### Database
A init_db.sql file is already available in this repository project

### Client side
- for some reasons, when you fill the form for the event and activities MySql doesn't allow special characters such as: , ? ' etc. So when you test, keep this in mind
- the date input in the form is type = "text"
- the fetch by ID in App.js doesn't work (but the code is there -_-')

### Backend
- An INNER JOIN on MySQL has been added in the SELECT to allow you to see in Postman all the necessary information without it being doubled
- Remember to use port 5001 in Postman and not the usual 5000


Enjoy and really looking forward to see your Feature extension!!!



