# key-value-store
Basic key-value store with historical lookup

##Usage
To insert and query objects with user interface, visit 
``` 
https://vd-database.herokuapp.com/
```
For commandline interface, 
To query for objects, do a basic cURL GET request, for example:
```
curl -X GET 'https://vd-database.herokuapp.com/object/<your-key-name>'
```
For querying with timestamp:
```
curl -X GET 'https://vd-database.herokuapp.com/object/<your-key-name>?timestamp=<timestamp-in-unix>'
```
For insertion:
```
curl -H "Content-Type: application/json" -X POST -d '{"<your-key-name>":"<your-value>"}' https://vd-database.herokuapp.com/object
```
##Running the test
The test requires the localhost server to be running
``` 
npm start
mocha
```
