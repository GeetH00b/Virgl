// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map
///variable para el manejo de la ficha de tiempo y fecha
var date
///variable para guardar valor nnumerico del dia de la semana (0-6 -> domingo-sabado)
var day
var poslat
var poslng
var infowindow 

function initMap() {
    
    //varibale para el mapa  
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15,
        disableDefaultUI:true,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    });
    
    // infowindow = new google.maps.InfoWindow({map: map});

    // encontrar al cliente sobre el mapa si el cliente lo permite
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            map.setCenter(pos);
            placeLocMarker(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    //map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    //Un listner en el mapa, checa si hay un click, se corre un funcion evento con la cual se pone el markador
    google.maps.event.addListener(map, 'click', function(event) {placeMarker(event.latLng);
      //generar ficha de fecha al crear un marcador nuevo, y de pasada obtener el dia de la semana en el que se creo
      date= new Date();
      console.log(date);
      day=date.getDay();
      console.log(day);
      
      poslat=event.latLng.lat();
      poslng=event.latLng.lng();
      console.log(poslat , poslng);



    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
                            //setTimeout(function () { infowindow.close(); }, 5000);
}

//Intentando hacer searchbar funcional
// function init() {
//     var map = new google.maps.Map(document.getElementById('map-canvas'), {
//     center: 
//         {lat: 12.9715987,lng: 77.59456269999998},
//         zoom: 12
//     });

//     var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
    
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
    
//     google.maps.event.addListener(searchBox, 'places_changed', function(){
//         searchBox.set('map', null);
//         var places = searchBox.getPlaces();
//         var bounds = new google.maps.LatLngBounds();
//         var i, place;
//         for (i = 0; place = places[i]; i++) {
//             (function(place) {
//                 var marker = new google.maps.Marker({
//                     position: place.geometry.location
//                 });
//                 marker.bindTo('map', searchBox, 'map');
//                 google.maps.event.addListener(marker, 'map_changed', function() {
//                     if (!this.getMap()) {
//                         this.unbindAll();
//                     }
//                 });
//                 bounds.extend(place.geometry.location);
//             }(place));
//         }
//     map.fitBounds(bounds);
//     searchBox.set('map', map);
//     map.setZoom(Math.min(map.getZoom(),12));
//     });
// }

//haciendo que funcionen los marcadores
var canPlace = false;
//var audio = new Audio('images/Click2-Sebastian-759472264.mp3');
var dia = 'images/virgl_marker_today.png';
var lastPlacedLoc;

// function myKeyPress(0){
//     dia = 'images/virgl_marker_today.png';
// }
// function myKeyPress(1){
//     dia = 'images/virgl_marker_do.png';
// }
// function myKeyPress(2){
//     dia = 'images/virgl_marker_lu.png';
// }
// function myKeyPress(3){
//     dia = 'images/virgl_marker_ma.png';
// }
// function myKeyPress(4){
//     dia = 'images/virgl_marker_mi.png';
// }
// function myKeyPress(5){
//     dia = 'images/virgl_marker_ju.png';
// }
// function myKeyPress(6){
//     dia = 'images/virgl_marker_vi.png';
// }
// function myKeyPress(7){
//     dia = 'images/virgl_marker_sa.png';
// }

var html =  "<table>"+
                "<tr id = 'select' onclick='infowindow.close();windowCrime(0);'>"+
                    "<td><img src='images/virgl_icon_inseguro.png'></td>"+
                    "<td><hi>Inseguridad</hi></td>"+
                "</tr>"+
                "<tr id = 'select' onclick='infowindow.close();windowCrime(1)'>"+
                    "<td><img src='images/virgl_icon_robo.png'></td>"+
                    "<td><hi>Robo</hi></td>"+
                "</tr>"+
                "<tr id = 'select' onclick='infowindow.close();windowCrime(2)'>"+
                    "<td><img src='images/virgl_icon_asalto.png'></td>"+
                    "<td><hi>Asalto</hi></td>"+
                "</tr>"+
                "<tr id = 'select' onclick='infowindow.close();windowCrime(3)'>"+
                    "<td><img src='images/virgl_icon_carro.png'></td>"+
                    "<td><hi>Robo Vehicular</hi></td>"+
                "</tr>"+
                "<tr id = 'select' onclick='infowindow.close();windowCrime(4)'>"+
                    "<td><img src='images/virgl_icon_homicidio.png'></td>"+
                    "<td><hi>Homicidio</hi></td>"+
                "</tr>"+
            "</table>";

function windowCrime(crime){
var crimeIcon;
    var marker = new google.maps.Marker({
            position: lastPlacedLoc,
            map: map,
            icon: dia,});
    
    switch(crime){
        case  0:
            //variable que que es la info Window que sale con el marker
            infowindow = new google.maps.InfoWindow({
                content: htmlInseguro})
        break;
        
        case  1:
            //variable que que es la info Window que sale con el marker
            infowindow = new google.maps.InfoWindow({
                content: htmlRobo})
        break;

        case  2:
            //variable que que es la info Window que sale con el marker
            infowindow = new google.maps.InfoWindow({
                content: htmlAsalto})
        break;

        case  3:
            //variable que que es la info Window que sale con el marker
            infowindow = new google.maps.InfoWindow({
                content: htmlCarro})
        break;

        case  4:
            //variable que que es la info Window que sale con el marker
            infowindow = new google.maps.InfoWindow({
                content: htmlHomicidio})
    }  
    //se crean el mapa y el marcador
    infowindow.open(map,marker);
}

var htmlInseguro = "<table>"+
                "<tr id = 'secondPrompt'>"+
                    "<td> <img src = 'images/virgl_icon_inseguro.png'> </td>"+
                    "<td><form action=''><textarea name='Description' placeholder='Describa brevemente'></textarea></td>"+
                    "<td><form action = ''><input type='submit' value='Reportar' onclick='infowindow.close()'/></form></td>"+
                "</tr>"+
            "<table>";


var htmlRobo = "<table>"+
                "<tr id = 'secondPrompt'>"+
                    "<td> <img src = 'images/virgl_icon_robo.png'> </td>"+
                    "<td><form action=''><textarea name='Description' placeholder='Describa brevemente'></textarea></td>"+
                    "<td><form action = ''><input type='submit' value='Reportar' onclick='infowindow.close()'/></form></td>"+
                "</tr>"+
            "<table>";

var htmlAsalto = "<table>"+
                "<tr id = 'secondPrompt'>"+
                    "<td> <img src = 'images/virgl_icon_asalto.png'> </td>"+
                    "<td><form action=''><textarea name='Description' placeholder='Describa brevemente'></textarea></td>"+
                    "<td><form action = ''><input type='submit' value='Reportar' onclick='infowindow.close()'/></form></td>"+
                "</tr>"+
            "<table>";

var htmlCarro = "<table>"+
                "<tr id = 'secondPrompt'>"+
                    "<td> <img src = 'images/virgl_icon_carro.png'> </td>"+
                    "<td><form action=''><textarea name='Description' placeholder='Describa brevemente'></textarea></td>"+
                    "<td><form action = ''><input type='submit' value='Reportar' onclick='infowindow.close()'/></form></td>"+
                "</tr>"+
            "<table>";

var htmlHomicidio = "<table>"+
                "<tr id = 'secondPrompt'>"+
                    "<td> <img src = 'images/virgl_icon_homicidio.png'> </td>"+
                    "<td><form action=''><textarea name='Description' placeholder='Describa brevemente'></textarea></td>"+
                    "<td><form action = ''><input type='submit' value='Reportar' onclick='infowindow.close()'/></form></td>"+
                "</tr>"+
            "<table>";



function enableCanPlace(){
    canPlace = true;
    //audio.Play();
    document.getElementById('buttonimg').src='images/virgl_button_down.png';
}

function placeMarker(location) { 
    if(canPlace){    
        //varible que es el marcador
        var marker = new google.maps.Marker({
            //atributo de posicion
            position: location,
            //atributo del mapa
            map: map,
            //icono
            icon: dia,
            //opcional, le puse la animacion DROP
            animation:google.maps.Animation.DROP
        });
        
        //variable que que es la info Window que sale con el marker
        infowindow = new google.maps.InfoWindow({content: html});
        
        //se crean el mapa y el marcador
        infowindow.open(map,marker);

        canPlace = false;
        document.getElementById('buttonimg').src='images/virgl_button_up.png';
        lastPlacedLoc = location;
        ///setTimeout(function () { infowindow.close(); }, 5000);
    }
}
function placeLocMarker(pos) { 
    //varible que es el marcador
    var marker = new google.maps.Marker({
        //atributo de posicion
        position: pos,
        //atributo del mapa
        map: map,
        //icono
        icon: 'images/virgl_marker_base.png',
        //opcional, le puse la animacion DROP
        animation:google.maps.Animation.DROP
    });
}

//no hace nada la linea de abajo, rompe tdo
//google.maps.event.addDomListener(window, 'load', init);

google.maps.event.addDomListener(window, 'load', initMap);
//initMap();


