var express = require('express');

var app = express();

app.use(express.static(__dirname + '/client'));

// app.get('/login', ??);
app.post('/login', handler.signIn);

app.get('/destination', handler.fetchTodos)
app.post('/destination', handler.addDestination);

app.post('/destination/todo', handler.addTodo);

app.listen(3000, function() {
  console.log('Listening on port 3000');
});