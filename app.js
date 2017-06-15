
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.todos = [];

io.sockets.on("connection", function(socket){

  socket.on("new_todo", function(todo){
    if (todo != '') {
      app.todos.push(todo);

      socket.emit("action_new_todo", todo);
      socket.broadcast.emit("action_new_todo", todo);
    }
  });

  socket.on("delete_todo", function(todo_id){
    var id = new Number(todo_id);
    
    if (isNaN(id) == false ) {
      app.todos.splice(id, 1);

      socket.emit("action_delete_todo", id);
      socket.broadcast.emit("action_delete_todo", id);
    }
  });

});


app.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: app.todos});
})

.get('/client.js', function(req, res){
  fs.readFile('./client.js', 'utf-8', function(error, content) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
})

.use(function(req, res, next){
    res.redirect('/todo');
});

server.listen(8080);   
console.log("Listening on http://localhost:8080/ ");
