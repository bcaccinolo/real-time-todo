var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
var todos = [];


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

/* On affiche la todolist et le formulaire */
.get('/todo', todos, function(req, res) { 
    res.render('todo.ejs', {todolist: todos});
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, todos, function(req, res) {
    if (req.body.newtodo != '') {
      todos.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', todos, function(req, res) {
    if (req.params.id != '') {
        todos.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);   
