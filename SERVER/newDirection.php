<?php
header("Access-Control-Allow-Origin: *");
include("./conection.php");
$conexion=conectarse();
extract($_POST);

$sql="INSERT INTO direcciones (id_usuario,ciudad,direccion,direccion_google,descripcion,barrio) VALUES ('$id_usuario','$ciudad','$direccion','$direccion_google','$descripcion','$barrio')";
$result = mysqli_query($conexion,$sql);
if(!$result){
  echo"Error en la consulta";
  exit();
}
else{
  echo "1";
}
?>
