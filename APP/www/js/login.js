window.onload = function () {
  var session = localStorage.getItem("session");
  if (session !== null) {
    location.href = 'routes/reservations.html';
  }
};

function Login() {
  var username = jQuery('#inputUsername').val();
  var password = jQuery('#inputPassword').val();

  var datos = {
    "username": username,
    "password": password
  };

  $.ajax({
    data: datos,
    url: 'https://juandlopez.000webhostapp.com/limpieza/login.php',
    dataType: 'html',
    type: 'post',
    beforeSend: function () {
      $('body').addClass('loading');
    },
    success: function (response) {
      if (response == '0') {
        jQuery("#response-container").html("Datos incorrectos");
      }
      else {
        
        //Crear token para guardar la sesion
        var header = {
          "typ": "JWT",
          "alg": "HS256"
        };

        var data = {
          "id": JSON.parse(response).id,
          "username": JSON.parse(response).username,
        }

        var secret = "gameofthrones";

        var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
        var encodedHeader = base64url(stringifiedHeader);

        var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
        var encodedData = base64url(stringifiedData);

        var token = encodedHeader + "." + encodedData;

        var signature = CryptoJS.HmacSHA256(token, secret);
          signature = base64url(signature);

        var signedToken = token + "." + signature;

        //Variable que se almacenara en LocalStorage

        var session = {
          login: 'true',
          id: JSON.parse(response).id,
          token: signedToken
        };

        //Se guarda la variable en LocalSorage y se redirecciona.

        session = JSON.stringify(session);
        localStorage.setItem("session", session);
        location.href = 'routes/reservations.html';
      }
    }
  });

}
