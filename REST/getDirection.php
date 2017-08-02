<?php
  header("Access-Control-Allow-Origin: *");
  include("./conection.php");
  $conexion=conectarse();
  extract($_POST);
  $sql = "SELECT * FROM direcciones WHERE id_direccion='$id_direccion'";
  $result = mysqli_query($conexion,$sql);

  if(!$result){
    echo"Error en la consulta";
    exit();
  }
  else{
    $data=mysqli_fetch_array($result);
    echo (json_encode($data));
}

?>
