
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map;



      function initMap() {
        var map = new google.maps.Map(document.getElementById('googleMap'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 13,
          disableDefaultUI:true,
          mapTypeId:google.maps.MapTypeId.ROADMAP
        });
        var infoWindow = new google.maps.InfoWindow({map: map});

       

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        ///LISTENER BAJO CONSTRUCCION
        map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

        google.maps.event.addListener(map, 'click', function(event) {placeMarker(event.latLng);});


      }
      ///COLOCAR MARCADORES
      function placeMarker(location) {
  		var marker = new google.maps.Marker({
    	position: location,
    	map: map,
  		});
  		
}


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }




//Intentando hacer searchbar funcional
      function init() {
   var map = new google.maps.Map(document.getElementById('map-canvas'), {
     center: {
       lat: 12.9715987,
       lng: 77.59456269999998
     },
     zoom: 12
   });


      var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('pac-input'));
   google.maps.event.addListener(searchBox, 'places_changed', function() {
     searchBox.set('map', null);


     var places = searchBox.getPlaces();

     var bounds = new google.maps.LatLngBounds();
     var i, place;
     for (i = 0; place = places[i]; i++) {
       (function(place) {
         var marker = new google.maps.Marker({

           position: place.geometry.location
         });
         marker.bindTo('map', searchBox, 'map');
         google.maps.event.addListener(marker, 'map_changed', function() {
           if (!this.getMap()) {
             this.unbindAll();
           }
         });
         bounds.extend(place.geometry.location);


       }(place));

     }
     map.fitBounds(bounds);
     searchBox.set('map', map);
     map.setZoom(Math.min(map.getZoom(),12));

   });
 }
 google.maps.event.addDomListener(window, 'load', init);



       initMap();


