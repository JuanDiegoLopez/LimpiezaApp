<?php
header("Access-Control-Allow-Origin: *");
include("./conection.php");
$conexion=conectarse();
extract($_POST);
$sql = "SELECT * FROM direcciones WHERE id_usuario='$id_usuario'";
$result = mysqli_query($conexion,$sql);

if(!$result){
  echo"Error en la consulta";
  exit();
}
else{

    $address = array();
    $i=0;
    while($data=mysqli_fetch_array($result)){
      $address[$i]= $data;
      $i++;
    }
    echo (json_encode($address));
  }
?>
