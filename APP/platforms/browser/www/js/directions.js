window.onload=MyAddress();
function MyAddress() {
  var id_usuario = JSON.parse(localStorage.getItem("session")).id;
  data = {
    'id_usuario': id_usuario
  };

  $.post('https://juandlopez.000webhostapp.com/limpieza/directions.php',data, function(res){
    res = JSON.parse(res);
    console.log(res);
    $.each(res,function(i){
      $('#content').append(`
        <div class="panel">
          <div class="panel-heading">`+res[i].direccion+`</div>
          <div class=" row panel-body">
            <div class="col-xs-6">
              `+res[i].descripcion+`, `+res[i].barrio+`, `+res[i].ciudad+`
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil"></span> Modificar</button>
              <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> Eliminar</button>
            </div>
          </div>
        </div>
        `
      );
    });
  });
}
