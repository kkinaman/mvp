var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost:27017/travelPlannerDB');
mongoose.connect('mongodb://admin:admin@ds147377.mlab.com:47377/heroku_g3q08x35');

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
  imageUrl: String,
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

var todoSchema = new Schema({
  text: String,
  imageUrl: String,
  votes: Number
});

exports.userModel = mongoose.model('User', userSchema);
exports.destinationTodoModel = mongoose.model('DestinationTodos', destinationTodosSchema);
exports.todoModel = mongoose.model('Todo', todoSchema);