<?php
  header("Access-Control-Allow-Origin: *");
  include("./conection.php");
  $conexion=conectarse();
  extract($_GET);
  $sql = "SELECT * FROM reservas WHERE id_usuario='$id_usuario' ORDER BY fecha ASC";
  $result = mysqli_query($conexion,$sql);

  if(!$result){
    echo"Error en la consulta";
    exit();
  }
  else{

      $reservas = array();
      $i=0;
      while($data=mysqli_fetch_array($result)){
        $reservas[$i]= $data;
        $i++;
      }
      echo (json_encode($reservas));
    }
?>
