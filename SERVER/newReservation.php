<?php
  header("Access-Control-Allow-Origin: *");
  include("./conection.php");
  $conexion=conectarse();
  extract($_POST);
  $sql = "INSERT INTO reservas (id_usuario,id_direccion,id_empleado,horas,fecha) VALUES ('$id_usuario','$id_direccion','$id_empleado','$horas','$fecha')";
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
                    <title>NUEVA RESERVA</title>
                  </head>
                  <body>
                     <h1>NUEVA RESERVA</h1>
                     <div>
                        Se ha registrado una nueva reserva en Limpieza! <br>
                        <b>id_usuario: </b> ".$id_usuario." <br>
                        <b>id_empleado:</b> ".$id_empleado." <br>
                        <b>id_direccion:</b> ".$id_direccion." <br>
                        <b>Tiempo del servicio:</b> ".$horas." <br>
                        <b>Fecha del servicio:</b> ".$fecha." <br>
                     </div>
                  </body>
                  </html>
                  ";
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= "Content-Type: text/html; charset=UTF-8". "\r\n";
        $cabeceras .= 'To: Administrador'."\r\n";
        $cabeceras .= 'From: Limpieza@hotmail.com' . "\r\n";
        $asunto = "Nueva reserva";
        if(mail('destroucs@outlook.es',$asunto,$mensaje,$cabeceras)){
          echo "success";
        }
        else{
          echo "0";
        }
    }
 ?>
