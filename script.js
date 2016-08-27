//Una variable que contiene el mapa en si
			var map;
			
			//Variable que contiene una posicion, es la posicion inicial
			var myCenter=new google.maps.LatLng(51.508742,-0.120850);


			//Funcion que inicia el mapa y todo
			function initialize()
			{
				//Variable que contiene las propiedas del mapa, se utliza al crear el mapa
				var mapProp = {
					center:myCenter,
					zoom:5,
					disableDefaultUI:true,
					mapTypeId:google.maps.MapTypeId.ROADMAP
				};

				//Se crea el mapa, variable ya crveada
				map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

				//Un listner en el mapa, checa si hay un click, se corre un funcion evento con la cual se pone el markador
				google.maps.event.addListener(map, 'click', function(event) {placeMarker(event.latLng);});

				
				//copy paste de como conseguir ubicacion de la copmu
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
          			}, 	function() {
            				handleLocationError(true, infoWindow, map.getCenter());
          				});
        		} else {
          			// Browser doesn't support Geolocation
          			handleLocationError(false, infoWindow, map.getCenter());
        		}//aqui termina el copy paste
			}

			//funcion que pone el markador
			function placeMarker(location) {
				
				//varible que es el marcador
				var marker = new google.maps.Marker({
					//atributo de posicion
					position: location,
					//atributo del mapa
					map: map,
					//icono
					icon: 'images/guider_icon_marker.png',
					//opcional, le puse la animacion DROP
					animation:google.maps.Animation.DROP
				});
				
				//variable que que es la info Window que sale con el marker
				var infowindow = new google.maps.InfoWindow({
					content: "CRIME CITY<br>" + 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
				});
				
				//se crean el mapa y el marcador
				infowindow.open(map,marker);
			}

			//otro copy paste que maneja el error si no encuentra la ubicacion
			function handleLocationError(browserHasGeolocation, infoWindow, pos) {
             infoWindow.setPosition(pos);
                 infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');

            google.maps.event.addDomListener(window, 'load', initialize);
            }//termina el copy paste


            //Se inicia
			google.maps.event.addDomListener(window, 'load', initialize);