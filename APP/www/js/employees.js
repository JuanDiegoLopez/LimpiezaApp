
$(document).ready(function() {
  $.getJSON('http://192.168.0.15/limpieza/employees.php', function(resp){
    console.log(resp);
    $.each(resp,function(i){
      $('#content').append(
        `<div class='col-sm-4'>
          <div class='panel panel-primary'>
            <div class='panel-heading'>`+resp[i].nombre+`</div>
            <div class='panel-body'><img src='http://192.168.0.15/limpieza/img/`+resp[i].foto+`' class='img-responsive' style='width:100%'></div>
          </div>
        </div>`
      );
    });
});
});
