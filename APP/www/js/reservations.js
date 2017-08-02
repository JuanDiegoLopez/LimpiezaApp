window.onload=MyReservations();
function MyReservations(){
  var id_usuario = JSON.parse(localStorage.getItem("session")).id;
  $.getJSON('https://juandlopez.000webhostapp.com/limpieza/reservations.php',{'id_usuario': id_usuario}, function(res){
    console.log(res);
    //Condicion si no tiene reservas
    if(res.length===0){
      $('#content').append(`<h1 class='title'>No tienes reservas vigentes</h1>
          <br>
        <img src='../img/reservations.jpg'>
        <footer class="container-fluid bg-4 text-center footer">
          <p>El mejor serivicio para tu hogar</p>
        </footer>
        `);
    }
    else{
      //se recorre el array de las reservas
      $.each(res,function(i){
        //llamada ajax para retornar la direccion
        $.ajax({
              data:  {'id_direccion':res[i].id_direccion},
              url:   'https://juandlopez.000webhostapp.com/limpieza/getDirection.php',
              dataType: 'html',
              type:  'post',
              beforeSend: function () {
                  $('body').addClass('loading');
              },
              success:  function (dir) {
                dir = JSON.parse(dir);
                //llamada ajax para retornar el empleado

                $.ajax({
                      data:  {'id_empleado':res[i].id_empleado},
                      url:   'https://juandlopez.000webhostapp.com/limpieza/getEmployee.php',
                      dataType: 'html',
                      type:  'post',
                      beforeSend: function () {
                          $('body').addClass('loading');
                      },
                      success:  function (emp) {
                        emp = JSON.parse(emp);

                        var date = new Date(res[i].fecha);
                        var days = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
                        var months = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
                        var options = { weekday: 'long', month: 'long', day: 'numeric' };
                        var numberday = date.getDate() + 1;

                        $('#content').append(`
                          <div class="panel">
                            <div class=" panel-body">
                              <div class='row'>
                                <div class="fecha col-xs-2">
                                <span class='day-number'>`+numberday+`</span>
                                `+months[date.getMonth()]+`
                                </div>
                                <div class="descripcion col-xs-10">
                                <span class='dia'>`+days[date.getDay()+1]+`</span>
                                <br>
                                8 am | `+res[i].horas+` horas <br>
                                `+dir.direccion+` `+dir.ciudad+` <br>
                                </div>
                              </div>
                              <div class='div-img'>
                                <img class='img' src='http://juandlopez.000webhostapp.com/limpieza/img/`+emp.foto+`'></img>
                              </div>
                              <div class='nombre'>`+emp.nombre+`</div>
                            </div>
                          </div>
                          `);
                          $('body').removeClass('loading');
                      }
                  });
              }
          });
      });
    }
  });
}
