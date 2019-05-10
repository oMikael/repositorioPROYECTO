var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#logoutButton').on('click', function(){
  // cargar email y password
  /*let email = $("#email").val()
  let password = $("#password").val()

  json_to_send = {
    "email": email,
    "password" : password
  };

  json_to_send = JSON.stringify(json_to_send);

  //console.log(json_to_send)*/

  $.ajax({
    //url: 'https://herokuexfinal.herokuapp.com/users/logout',
    url: 'http://localhost:3000/users/logout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    /*data: json_to_send,*/
    success: function(){
      // guardar token en localstorage o cookie
      localStorage.removeItem('token')
      window.location = './index.html' //se direcciona a esta pagina
    },
    error: function(error) {
      console.log(error)
      alert(error["responseText"]);
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
})

var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      //url: 'https://herokuexfinal.herokuapp.com/todos/' + id,
      url: 'http://localhost:3000/todos/' + id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
        deleteTodo(id)
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

function deleteTodo(id) { 
  json_to_send = {
    "id" : id
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      //url: 'https://herokuexfinal.herokuapp.com/todos/' + id,
      url: 'http://localhost:3000/todos/' + id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("DELETE!!")
        location.reload();
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

function loadTodos() {
  $.ajax({
    //url: 'https://herokuexfinal.herokuapp.com/todos',
    url: 'http://localhost:3000/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      //console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        //console.log(data[i].description)
        // algo asi:
        addTodo(data[i]._id, data[i].description, data[i].completed)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
      window.location = './index.html' //se direcciona a esta pagina
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value //lo que se escribe en el input
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'https://herokuexfinal.herokuapp.com/todos',
      url: 'http://localhost:3000/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        addTodo(data.createdBy, data.description, data.completed)
        //location.reload();
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})

function addTodo(id, todoText, completed) {
  var li = document.createElement("li");
  li.innerHTML = "<input type='checkbox' onclick='updateTodo(id, true)' name='todo' value='false' id='"+id+"'><span class='done'>"+todoText+"</span>";
  document.getElementById("unfinished-list").appendChild(li);
}