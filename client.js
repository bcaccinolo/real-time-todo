
var Client = {};

Client.insert_new_todo = function($ul, newtodo){
  var id = $ul.children().length;
  var link = "<a href='/todo/supprimer/" + id + "' id='" + id + "'>✘</a>";
  var todo_entry = link + " " + id + " " + newtodo;

  $ul.append( $('<li>').append(todo_entry) );
};

Client.delete_todo = function($ul, todo_id){ 
  var id = todo_id + 1;

  $todo = $ul.children("li:nth-child("+ id +")");
  $todo.remove();
};

