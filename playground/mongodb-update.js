const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  db.collection('Users').findOneAndUpdate(
    {_id : new ObjectID('5ae1be68b1d28c17c0cfa076')}
  , {
    $set: {
      name: 'Roberto'
    },
    $inc : {
      age: -1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })

  //client.close();
});
