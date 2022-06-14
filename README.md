# JobItUp

## 0. Go to root folder(job-it-up)

## 1. To start mongo daemon 
mongod -port 3000 -dbpath ".\expressServer\data\db"

## 2. To start mongo client
mongo --port 3000 --authenticationDatabase admin

## 3. To load the database
load ('expressServer/createDB/createJobItUpSampleData.js');
load ('expressServer/createDB/createAdminUser.js');
exit

## 4. Compile Node/Express Server.  You may need to go to expressServer, expressServer/model & expressServer/interface subdirectories and compile the ts files.
cd expressServer
tsc AppServer.js

## 5. Execute Node/Express server on port 8080
go to project root directory (job-it-up)
node .\expressServer\AppServer.js 

## 6. To test server #3, try the following URL on the browser, while the server is running:
* http://localhost:8080/
* http://localhost:8080/app/jobposter

## 7. To start angular application
ng serve

## 8. Angular Application Route URLs:
http://localhost:4200/
http://localhost:4200/appliedJob
http://localhost:4200/applyjob/1
