window.onload= function(){
  var session = localStorage.getItem("session");
  if(session!==null){
    location.href = 'routes/reservations.html';
    }
  };

function Login(){
  var username = jQuery('#inputUsername').val();
  var password = jQuery('#inputPassword').val();

  var datos ={
    "username" : username,
    "password" :password
  };

  $.ajax({
        data:  datos,
        url:   'https://juandlopez.000webhostapp.com/limpieza/login.php',
        dataType: 'html',
        type:  'post',
        beforeSend: function () {
            $('body').addClass('loading');
        },
        success:  function (response) {
            if(response=='0'){
              jQuery("#response-container").html("Datos incorrectos");
            }
            else{
              var session = {
                login: 'true',
                id: JSON.parse(response).id
              };
              session=JSON.stringify(session);
              localStorage.setItem("session",session);
              location.href = 'routes/reservations.html';
            }
        }
    });

}
