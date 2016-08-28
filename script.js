
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

       

        // GEOLOCATION, inicia el mapa en donde esta el cliente
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          });
        } else {
          ///por si no tiene geolocation el navegador
          handleLocationError(false, infoWindow, map.getCenter());
        }

        ///LISTENER BAJO CONSTRUCCION
        	google.maps.event.addListener(map, 'click', function(event) {
	    		placeMarker(event.latLng);
  			});
      }


      ///COLOCAR MARCADORES
      function placeMarker(location) {
  		var marker = new google.maps.Marker({
	  		position: location,
	    	map: map,
  	  	});
 		 var infowindow = new google.maps.InfoWindow({
    	 content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
      });
  		infowindow.open(map,marker);
	   }


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

    initMap();
    


