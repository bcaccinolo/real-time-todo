
var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var io = require('socket.io')(server);

app.todos = ['coucou le monde'];


io.sockets.on("connection", function(socket){
  console.log('socket IO ; connection faite');

  socket.on("new_todo", function(todo){
    console.log("the new todo is ", todo);

    if (todo != '') {
      app.todos.push(todo);

      socket.emit("action_new_todo", todo);
      socket.broadcast.emit("action_new_todo", todo);
    }
  });

  socket.on("delete_todo", function(todo_id){

    var id = new Number(todo_id);
    console.log("todo to delete id: " + id);
    console.log("isi not a number: ", isNaN(id));
    
    if (isNaN(id) == false ) {
      console.log("the todos : ", app.todos);
      app.todos.splice(id, 1);
      console.log("after the todos : ", app.todos);

      socket.emit("action_delete_todo", id);
      socket.broadcast.emit("action_delete_todo", id);
    }
  });

});




/* On affiche la todolist et le formulaire */
app.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: app.todos});
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        app.todos.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
});

server.listen(8080);   
