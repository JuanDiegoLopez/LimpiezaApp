window.onload = getData();

function getData(){
  var id_user = JSON.parse(localStorage.getItem("session")).id;
  //Llamada ajax para obtener todos los empleados
  $.getJSON('https://juandlopez.000webhostapp.com/limpieza/employees.php', function(emp){
          $.each(emp,function(i){
            $('#employee').append(
              `<option class="form-control" value='`+emp[i].id_empleado+`'>`+emp[i].nombre+`</option>`);
          });
          //Llamada ajax para obtener todas las direcciones del usuario
            $.ajax({
                  data:  {'id_usuario':id_user},
                  url:   'https://juandlopez.000webhostapp.com/limpieza/directions.php',
                  dataType: 'JSON',
                  type:  'post',
                  beforeSend: function () {
                      $('body').addClass('loading');
                  },
                  success:  function (dir) {
                    $.each(dir,function(i){
                      $('#direction').append(
                        `<option class="form-control" value='`+dir[i].id_direccion+`'>`+dir[i].direccion+` `+dir[i].ciudad +`</option>`);
                    });
                    $('body').removeClass('loading');
                  }
              });
    });
}

function newReservation(){
  var id_user = JSON.parse(localStorage.getItem("session")).id;
  var id_employee = $('#employee').val();
  var id_direction = $('#direction').val();
  var date = $('#datepicker').val();
  var time = $('input:radio[name=time]:checked').val();

  datos = {
    'id_usuario': id_user,
    'id_direccion': id_direction,
    'id_empleado': id_employee,
    'horas': time,
    'fecha': date
  };
  $.ajax({
        data:  datos,
        url: 'https://juandlopez.000webhostapp.com/limpieza/newReservation.php',
        dataType: 'html',
        type:  'post',
        beforeSend: function () {
            $('body').addClass('loading');
        },
        success:  function (response) {
          if(response=='success'){
            location.href = 'reservations.html';
          }
        }
    });
}


$(document).ready(function(){
  $('#datepicker').datepicker({
      autoclose: true,
      disableTouchKeyboard: true,
      format: 'yyyy-mm-dd'
  });
});
