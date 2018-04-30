const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {User} = require('./../Server/models/user');
const {ObjectId} = require('mongodb');

/*
var id = '5ae7566c101d790d40f026c614';

if (!ObjectId.isValid(id)){
  console.log('Id not valid');
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id)
.then((todo) => {
  if (!todo){
    return console.log('id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => {
  console.log(e);
}); */

User.findById('5ae46097a7b8170ea48e308b').then((user) => {
  if (!user){
    return console.log('No user with that id');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
  console.log(e);
})
