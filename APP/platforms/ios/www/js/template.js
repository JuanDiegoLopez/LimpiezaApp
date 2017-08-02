$(document).ready(function() {
    loadHeader();

});
function loadHeader(){
 $('#navbar').html(`
          <link rel="stylesheet" href="../css/navbar.css">
          <script type="text/javascript" src='../js/navbar.js'></script>
          <nav id='navbar' class="navbar navbar-default navbar-fixed-top">
             <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; Tus Reservas</span>
             <div id="mySidenav" class="sidenav">
             <ul>
               <li><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></li>
               <li class='active'><a href="reservations.html">Tus Reservas</a></li>
               <li><a href="#">Nueva Reserva</a></li>
               <li><a href="directions.html">Direcciones</a></li>
               <li><a href="#">Contactanos</a></li>
               <li><a href="../index.html" onclick="Logout()">Cerrar sesion</a></li>
             </ul>
           </div>
           </nav>
          `);
}

function loadFooter(){
   $('#footer').html(`<footer class="container-fluid footer text-center">
                     <p>Juan Diego López</p>
                   </footer>
                     `);
}
