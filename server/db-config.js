var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/travelPlannerDB');

var db = mongoose.connection;

db.on('err', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db is open!');
});

var userSchema = new Schema({
  username: String,
  password: String
});

var destinationTodosSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

var todoSchema = new Schema({
  text: String,
  imageUrl: String
});

exports.userModel = mongoose.model('User', userSchema);
exports.destinationTodoModel = mongoose.model('DestinationTodos', destinationTodosSchema);
exports.todoModel = mongoose.model('Todo', todoSchema);