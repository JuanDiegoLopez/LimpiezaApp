<?php
  header("Access-Control-Allow-Origin: *");
  include("./conection.php");
  $conexion=conectarse();
  extract($_POST);
  $sql = "SELECT * FROM empleados WHERE id_empleado='$id_empleado'";
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
