var db = require('db-config');

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
  //adds destination to db
};

exports.addTodo = function(req, res) {
  //adds todo to current destination
};