const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {User} = require('./../Server/models/user');
const {ObjectId} = require('mongodb');
/*
Todo.remove().then((res) => {
  console.log(res);
});*/

//Todo.findOneAndRemove();
//Todo.findByIdAndRemove();

Todo.findByIdAndRemove('5ae892528a77b332002e4bdd').then((todo) => {
  console.log(todo);
})
