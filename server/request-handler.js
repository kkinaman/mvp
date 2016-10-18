var db = require('./db-config');

var User = db.userModel;
var DestinationTodo = db.destinationTodoModel;
var Todo = db.todoModel;

// exports.signIn = function(req, res) {
//   // Sign in existing user
// }

//GET to /destination
exports.fetchTodos = function(req, res) {
  //TODO: should find the dest record specific to a user
  DestinationTodo.findOne({name: req.query.dest})
    .populate('todos')
    .exec(function(err, dest) {
      console.log(dest.todos);
      res.status(200).send(dest);
    });
};

//POST to /destination
exports.addDestination = function(req, res) {
  DestinationTodo.findOne({name: req.body.name})
    .then(function(dest) {
      if (!dest) {
        DestinationTodo.create({name: req.body.name})
          .then(function(dest) {
            res.status(201).send(dest);
          });
      }
    });
  
};

//POST to /destination/todo
exports.addTodo = function(req, res) {
  Todo.findOne({text: req.body.text})
    .then(function(todo) {
      if (!todo) {
        Todo.create({text: req.body.text})
          .then(function(todo) {
            var todoId = todo._id;
            DestinationTodo.findOneAndUpdate(
              {name: req.body.dest},
              {$push: {todos: todoId}},
              {safe: true, upsert: true},
              function(err, dest) {
                res.status(201).send(dest);
              }
            )
          });
      }
    });

  
};


