var db = require('./db-config');

var User = db.userModel;
var DestinationTodo = db.destinationTodoModel;
var Todo = db.todoModel;

var gettyApi = require('gettyimages-api');
var gettyKeys = require('../client/env/config.js');
var creds = {
  apiKey: gettyKeys.apiKey,
  apiSecret: gettyKeys.apiSecret,
  username: gettyKeys.gettyUsername,
  password: gettyKeys.gettyPassword
};
var client = new gettyApi(creds);

// exports.signIn = function(req, res) {
//   // Sign in existing user
// }

//GET to /destination
exports.fetchTodos = function(req, res) {
  //TODO: should find the dest record specific to a user
  DestinationTodo.findOne({name: req.query.dest})
    .populate('todos')
    .exec(function(err, dest) {
      res.status(200).send(dest);
    });
};

//GET to /destination/photos
exports.fetchImages = function(req, res) {
  client.search().images().withPage(1).withPageSize(9).withPhrase(req.query.dest + ' ' + req.query.query)
      .execute(function(err, response) {
          if (err) {
            throw err;
          }
          // client.downloads().images().withId(response.images[0].id).execute(
          //     function(err, resp) {
          //         if (err) throw err;
          //         console.log(resp);
          //     });
          res.status(200).send(response.images);
      });
};

//GET to /places
exports.fetchPlaces = function(req, res) {
  DestinationTodo.where('todos').ne([ ])
    .then(function(places) {
      res.status(201).send(places);
    });
};

//POST to /destination
exports.addDestination = function(req, res) {
  DestinationTodo.findOne({name: req.body.name})
    .then(function(dest) {
      if (!dest) {
        DestinationTodo.create({name: req.body.name, imageUrl: ''})
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
        Todo.create({text: req.body.text, votes: req.body.votes})
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

//POST to /destination/todo/image
exports.addImageTodo = function(req, res) {
  Todo.findOne({imageUrl: req.body.imageUrl})
    .then(function(todo) {
      if (!todo) {
        Todo.create({text: req.body.text, imageUrl: req.body.imageUrl, votes: req.body.votes})
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

//POST to /destination/todo/remove
exports.removeTodo = function(req, res) {
  Todo.remove({_id: req.body._id})
    .then(function(){
      res.status(201).send();
    });
};

//POST to /destination/todo/vote
exports.updateVotes = function(req, res) {
  Todo.findOneAndUpdate(
    {_id: req.body.id}, 
    {votes: req.body.votes},
    {safe: true, upsert: true},
    function(err, todo) {
      res.status(201).send(todo);
    }
  );
};

exports.updateDestPhoto = function(req, res) {
  // console.log('body', req.body);
  DestinationTodo.findOneAndUpdate(
    {name: req.body.dest},
    {imageUrl: req.body.imageUrl},
    {safe: true, upsert: true},
    function(err, dest) {
      // console.log(dest);
      res.status(201).send(dest);
    }
  );
};



