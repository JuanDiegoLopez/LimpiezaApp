<?PHP
function conectarse(){
  $conexion = mysqli_connect('localhost', 'id1840264_root','gameofthrones','id1840264_limpieza');
  if(!$conexion)
   {
    echo "Error conectando a la base de datos.";
    exit();
   }
   return $conexion;
 }
 ?>
