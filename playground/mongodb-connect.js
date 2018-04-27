//The mongoClient lets us make requests to the mongo server
//const MongoClient = require('mongodb').MongoClient;
//deconstructuring lets us pull of some of the object's variables
//and turn them into variables
//ObjectID lets us make new objectIds
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  /**db.collection('Todos').insertOne({
    text:'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert Todo');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  }); **/

  /**db.collection('Users').insertOne({
    name: 'Roberto',
    age: 26,
    location:'China'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert Todo');
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  })
**/
  client.close();
});
