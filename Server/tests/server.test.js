const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
  {text: 'First test todo',
_id: new ObjectId},
  {text: 'Second test todo',
_id: new ObjectId,
completed: true,
completedAt: 123}
]

//This func runs before each test case and
//only moves to the test when we call done
beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
    }).then(() => done());
});

//decribe block to group all of the routes
//each test case is called with done to finish it
describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find({text: 'Test todo text'}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({text: ''})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    })
  })
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    request(app)
    .get(`/todos/${new ObjectId}`)
    .expect(404)
    .end(done);
  });

  it('should return a 404 for non-object ids', (done) => {
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    //We pass in a callback function because we
    //want to do some async stuff before calling done
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toBeFalsy();
        done();
      }).catch((e) => done(e));
    });
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
    .delete(`/todos/${new ObjectId}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    const id = todos[0]._id;
    request(app)
    .patch(`/todos/${id}`)
    .send({
        text: 'Updated text in todo',
        completed: true
      })
    .expect(200)
    .expect((err, res) => {
      console.log(res);
      if (err) {
        return done(err);
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo.text).toBe(res.body.text);
        expect(todo.completed).toBe(true);
        expect(todo.completedAt).toBeA(number);
        done();
    });
  });
});

  it('should clear completedAt when todo is not completed', (done) => {
    const id = todos[1]._id;
    request(app)
    .patch(`/todos/${id}`)
    .send({
      text: 'Updated second text in todo',
      completed: false
    })
    .expect(200)
    .expect((err, res) => {
      console.log(res);
      if (err) {
        return done(err);
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo.text).toBe(res.body.text);
        expect(todo.completed).toBe(false);
        expect(todo.completedAt).toNotExist();
        done();
      });
    });
  });
});
