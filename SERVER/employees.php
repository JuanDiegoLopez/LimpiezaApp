<?php
header("Access-Control-Allow-Origin: *");
include("./conection.php");
$conexion=conectarse();
$sql = "SELECT * FROM empleados";
$result = mysqli_query($conexion,$sql);

if(!$result){
  echo"Error en la consulta";
  exit();
}
else{

    $empleados=array();
    $i=0;
    while($data=mysqli_fetch_array($result)){
    $empleados[$i] =$data;
    $i++;
    }
    echo (json_encode($empleados));

  }
 ?>
