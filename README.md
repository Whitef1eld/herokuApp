# Clipper App
App for asking questions and recieving answers from registrated users. 



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
This project is using MySql Database



## Tasks not done:
-Editing and deleting answers from current user\
-No notification when somebody answers users question

# Steps to run application: 
1. Install node_modules in root directory by entering npm install in terminal (root directory)
2. If you get errors running backend you might need to enter next commands in cd clipper-app-backend directory:
  - go mod vendor
  - go mod init

3. Set up local instance of MySQL Database
  - set up a local instance in MySQL Workbench
  - go to clipper-app-backend/database/connection.go file
  - on line 15 change path to your database (local instance that you have set up in MySQL Workbench)  
  - should look like "username:password@/db_name"
  - verify that connection to database was made and tables are set in VScode by setting a new connection 
  
  
4. To run backend
   - cd clipper-app-backend
   - go run main.go
   
5. To run frontend
   - open new terminal and in root directory type in terminal:
   - npm start



### backend is hosted on [http://localhost:8080](http://localhost:8080)


## Enjoy my first ReactJS-Golang-MySQL App built from scratch
