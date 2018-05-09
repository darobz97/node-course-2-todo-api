const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{
  _id: userOneId,
  email: 'jfdkldsl@jfdklsd.kfd',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'jdkls@fjkds.fd',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  text: 'First test todo',
  _id: new ObjectId,
  _creator: userOneId
}, {
  text: 'Second test todo',
  _id: new ObjectId,
  completed: true,
  completedAt: 123,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (function (done) {
  this.timeout(10000);
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    //We just set up two promises and we want to wait for them to succeed
    //Here, we wait for all to complete before calling then
    Promise.all([userOne, userTwo]).then(() => done());
  });
});

module.exports = {todos, populateTodos, users, populateUsers};
