var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//This var is going to store our express app
var app = express();

app.use(bodyParser.json());

//WITH THE NEW MIDDLEWARE,we can send json to our app
//and express will format it to an object

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos/:id', (req, res) => {
  Todo.findById(req.params.id).then((todo) => {
    if (!todo){
      return res.send('Nothing found with that id');
    }
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    //I send an object with a property todos: todos
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('Sarted on port 3000');
});

module.exports = {app};
