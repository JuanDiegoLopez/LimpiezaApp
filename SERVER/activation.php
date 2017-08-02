<?php
  header("Access-Control-Allow-Origin: *");
  include("./conection.php");
  $conexion=conectarse();
  extract($_GET);

  $sql = "SELECT * FROM usuarios where codigo='$id'";
  $result = mysqli_query($conexion,$sql);

  if(!$result){
    echo"Error en la consulta";
    exit();
  }
  else{
    $data=mysqli_fetch_array($result);
    if($data==null){
      echo "Tu cuenta ha expirado, vuelve a registrarte";
    }
    else{
      if($data['activo']==1){
        echo "Ya has activado tu cuenta";
      }
      else{
        $sql1="UPDATE usuarios SET activo = '1' WHERE codigo= '$id'";
        $result1 = mysqli_query($conexion,$sql1);
        if(!$result1){
          echo"Error en la actualizacion";
          exit();
        }
        else{
          echo "
               <html>
               <head>
               <title>Activar cuenta</title>
               </head>
               <body>
               <h1> GRACIAS POR ACTIVAR TU CUENTA, YA PUEDES INICIAR SESION </h1>
               </body>
               </html>";
             }
      }
     }
   }
 ?>
