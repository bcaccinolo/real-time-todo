
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

      socket.emit("add_new_todo", todo);
      socket.broadcast.emit("add_new_todo", todo);
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
