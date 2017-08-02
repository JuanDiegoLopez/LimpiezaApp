<?php
header("Access-Control-Allow-Origin: *");
include("./conection.php");
$conexion=conectarse();
extract($_POST);

$sql = "SELECT * FROM usuarios where username='$username' and password='$password'";
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
