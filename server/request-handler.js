var db = require('./db-config');

var User = db.userModel;
var DestinationTodo = db.destinationTodoModel;
var Todo = db.todoModel;

// exports.signIn = function(req, res) {
//   // Sign in existing user
// }

exports.fetchTodos = function(req, res) {
  //fetch list of todos from destination
}

exports.addDestination = function(req, res) {
  DestinationTodo.create({name: req.body.name}, function(err, dest) {
    res.status(201).send(dest);
  });
};

exports.addTodo = function(req, res) {
  //adds todo to current destination
};