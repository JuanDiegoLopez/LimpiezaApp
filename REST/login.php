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
    if($data==null){
      echo "0";
    }
    else{
      if($data['activo']==0){
        echo "Aun no has verificado tu correo";
      }
      else{
        $response = array("username"=>$username, "id"=>$data['id_usuario']);
        echo (json_encode($response));
      }
    }
  }
 ?>
