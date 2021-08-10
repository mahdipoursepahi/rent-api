# rent-api

After cloning the project, run the "npm i" command

Then you should specify your MongoDB connection string in startup/db.js

Before running the project, you should set "app_jwtPrivateKey" and "port" environment variables so you have to run the following two commands:

For linux and mac users:
  1- export port=5000
  2- export app_jwtPrivateKey="myPrivateKey"

For windows users:
  1- $env:port=5000
  2- $env:app_jwtPrivateKey="myPrivateKey"
