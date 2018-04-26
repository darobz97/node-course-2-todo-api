const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

/**db.collection('Todos').find({
  _id: new ObjectID('5adee3c1a2d90c3bc8f6030c')
}).toArray().then((docs) => {
  console.log('Todos');
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
  log('Unableto fetch docs', err);
}); **/
db.collection('Users').find({name:'Julia'}).toArray().then((res) => {
  console.log(JSON.stringify(res, undefined, 2));
}, (err) => {
  log('Unableto fetch docs', err);
});
//We want to fetch all documents. find() return s mongoDB cursor, a pointer to those documents
//(not the actual documents, because it would be very inefficient)
//toArray returns all the documents as an array

  //client.close();
});
