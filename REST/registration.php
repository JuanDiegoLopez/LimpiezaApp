<?php
header("Access-Control-Allow-Origin: *");
include("./conection.php");
include("./Randomcode.php");
$conexion=conectarse();
extract($_POST);
$aleatorio = getRandomCode();

$sql = "INSERT INTO usuarios (codigo,username,password,nombre,celular,correo,activo) VALUES ('$aleatorio','$username','$password','$name','$cell','$email','0')";
$result = mysqli_query($conexion,$sql);

if(!$result){
  echo"Error en la consulta";
  exit();
}
else{

  $mensaje = "
                <html>
                <head>
                  <meta charset='utf-8'>
                  <meta name='viewport' content='initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width'>
                  <title>Activacion de cuenta</title>
                </head>
                <body>
                   <h1>Hola ".$name.", te has registrado en Limpieza</h1>
                   <div>
                      Estos son tus datos de registro: <br>
                      <b>Usuario:</b> ".$username." <br>
                      <b>Contraseña:</b> ".$password." <br>
                      Activa tu cuenta <a href=https://juandlopez.000webhostapp.com/limpieza/activation.php?id=".$aleatorio.">Aquí</a>
                   </div>
                </body>
                </html>
                ";
      $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
      $cabeceras .= "Content-Type: text/html; charset=UTF-8". "\r\n";
      $cabeceras .= 'To: '.$name. "\r\n";
      $cabeceras .= 'From: Limpieza@hotmail.com' . "\r\n";
      $asunto = "Activación";
      if(mail($email,$asunto,$mensaje,$cabeceras)){
        echo "Se ha enviado un mensaje a tu correo electronico con el código de activación";
      }
      else{
        echo "0";
      }
}
?>
