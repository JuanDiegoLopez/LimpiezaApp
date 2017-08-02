function registration(){
  var username = jQuery('#username').val();
  var password = jQuery('#password').val();
  var name = jQuery('#name').val();
  var email = jQuery('#email').val();
  var cell = jQuery('#cell').val();

  var datos ={
    "username" : username,
    "password" :password,
    "name" :name,
    "email":email,
    "cell":cell
  };

  $.ajax({
        data:  datos,
        url:   'https://juandlopez.000webhostapp.com/limpieza/registration.php',
        dataType: 'html',
        type:  'post',
        beforeSend: function () {
            jQuery("#response-container").html("Cargando...");
        },
        success:  function (response) {
            if(response=='0'){
              jQuery("#response-container").html("Datos incorrectos");
            }
            else{
              /*var session = {
                login: 'true',
                id: JSON.parse(response).id
              };
              session=JSON.stringify(session);
              localStorage.setItem("session",session);*/
              $('#response-container').html(response);
            }
        }
    });
}
