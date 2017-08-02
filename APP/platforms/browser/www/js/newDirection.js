$(document).ready(function() {
    load_map();
});

function load_map(){
  var latLng = new google.maps.LatLng(7.117697, -73.115429);
  var opciones = {
  center: latLng,
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById('map_canvas'), opciones);
  changeMyPosition(map);
}
function changeMyPosition(map,marker) {
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(map, 'click', function(event) {
      geocoder.geocode(
          {'latLng': event.latLng},
          function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                document.getElementById('google_address').value = results[0].formatted_address;
                if (marker) {
                  marker.setPosition(event.latLng);
                } else {
                  marker = new google.maps.Marker({
                     position: event.latLng,
                     map: map});
                }
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
              } else {
                document.getElementById('geocoding').innerHTML =
                    'No se encontraron resultados';
              }
            } else {
              document.getElementById('geocoding').innerHTML =
                  'Geocodificación  ha fallado debido a: ' + status;
            }
          });
    });

}
function searchAddress() {
    // Obtenemos la dirección y la asignamos a una variable
    var address = $('#street1').val()+" "+$('#street2').val()+" # "+$('#street3').val()+" "+$('#street4').val()+" "+$('#city').val();
    console.log(address);
    // Creamos el Objeto Geocoder
    var geocoder = new google.maps.Geocoder();
    // Hacemos la petición indicando la dirección e invocamos la función
    // geocodeResult enviando todo el resultado obtenido
    geocoder.geocode({ 'address': address}, geocodeResult);
}
function geocodeResult(results, status) {
    //se llenan los campos direccion y cordendas con las buscadas
    document.getElementById('google_address').value = results[0].formatted_address;
    // Verificamos el estatus
    if (status == 'OK') {
        // Si hay resultados encontrados, centramos y repintamos el mapa
        // esto para eliminar cualquier pin antes puesto
        var mapOptions = {
            center: results[0].geometry.location,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map($("#map_canvas").get(0), mapOptions);
        // fitBounds acercará el mapa con el zoom adecuado de acuerdo a lo buscado
        map.fitBounds(results[0].geometry.viewport);
        // Dibujamos un marcador con la ubicación del primer resultado obtenido
        var markerOptions = { position: results[0].geometry.location };
        var marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);
        changeMyPosition(map,marker);
    } else {
        // En caso de no haber resultados o que haya ocurrido un error
        // lanzamos un mensaje con el error
        alert("Geocoding no tuvo éxito debido a: " + status);
    }
}

function AddAddress(){
  var session = JSON.parse(localStorage.getItem("session"));
  var id_usuario = session.id;
  var city = $('#city').val();
  var address = $('#street1').val()+" "+$('#street2').val()+" # "+$('#street3').val()+" "+$('#street4').val();
  var google_address = $('#google_address').val();
  var description = $('#description').val();
  var barrio  =$('#barrio').val();

  var data = {
    'id_usuario': id_usuario,
    'ciudad': city,
    'direccion': address,
    'direccion_google': google_address,
    'descripcion': description,
    'barrio': barrio
  };

  $.ajax({
        data:  data,
        url:   'http://juandlopez.000webhostapp.com/limpieza/newDirection.php',
        dataType: 'html',
        type:  'post',
        beforeSend: function(){},
        success: function(response){
          if(response==1){
              location.href = 'directions.html';
          }
        }
      });

}
