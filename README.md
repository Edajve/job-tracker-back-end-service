# job-tracker-back-end-service
Back end project using express.js and Postgress

## Prerequites to run service
- In order to run this service, you'll need to clone the back-end and set up service to this repo. Be sure to                  set that back end service up and that it's up and running before you start this service. 
- Make sure you have these dependencies on locally downloaded on your machine. You can download all of these through npm or whatever package manager you prefer
    - Node.js
    - Express.js
    - Nodemon
    - cors
    - Postgress local app
    - Postico 2

## How to run this service
This should be the first step you conplete before you clone the front end ropo to this project, as it will take more involvement to get this developement environment up and running

### Setting up your local Postgress DB connection
- Open postgress app or if you're using a GUI tool like Postico 2
- Create a DB and name it job-tracker-DB. Then inside of that DB create a table and name the table name it 'application'. After creating that table, run this command to set up the structure of the application table
```CREATE TABLE application (
    id SERIAL PRIMARY KEY,
    site VARCHAR(255),
    date DATE,
    date_applied_to DATE,
    company_name VARCHAR(255),
    position VARCHAR(255),
    fulltime_contract BOOLEAN,
    salary INT,
    company_website VARCHAR(255),
    contact_info VARCHAR(255),
    call_back_date VARCHAR(255),
    tech_stack VARCHAR(255),
    round_1 VARCHAR(255),
    round_2 VARCHAR(255),
    round_3 VARCHAR(255),
    final VARCHAR(255),
    notes VARCHAR(255)
);
```

Do not alter this DB query this could potentially break the API's and front end code interacting with the BD. 
- Go back to the back-end this backend project and navigate to the 'db_connection.js file. In that file you'll see a object  where my called pool. Here in pool is where you set up all of your DB connection, make sure the credentials are correct for the DB connection to work. 

## Set up your nodemon end
- To eliminate having to re-spin up the service on every change, you can use nodemon. Make sure you have nodemon downloaded as your dependency. 


## Running service
Make sure before you run this service you've properly set up your DB. After that is set, starting from the root directory 'npm install' to install dependencies, then run 'npm start' to spin up service. In if you've ran this command successfully in the terminal it should give message similar to this 
``[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
listening on port 5000..
``

## What to do next
After you have completed all the above steps, depending on what you want to do. You can spin up the front-end service of this application to interact with the website, you can spin up the rest-assured api automated tests. Instructions to get the test scripts to run will be in that repo. Or you can do both, run the front end and also run the test. The choice is yours!