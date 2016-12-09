"use strict";

var map;
var latitude = 43.083848;
var longitude = -77.6799;

var infowindow;
var markers = [];

function initMap() {
  var mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
 
function createContent() {
  var request = {
    location: { lat: latitude, lng: longitude },
    radius: '10000',
    types: ['pet_store']
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i=0; i < results.length; i++){
        var place = results[i];
        createMarker(results[i]);
      }
    }
  
  
    function createMarker(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function(e){
        var pos = this.position;
        service.getDetails(place, function(result, status){
          makeInfoWindow(pos, result.name);
        });
      });

      markers.push(marker); 

    }

    function makeInfoWindow(position, msg){
        if(infowindow) infowindow.close();

        infowindow = new google.maps.InfoWindow({
          map: map,
          position: position,
          content: "<b>" + msg + "</b>"
        });
    }
  }
}

// -- Geolocations -- //
function findLoc() {
  //var output = document.getElementById("out");
  
  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    createContent();
  }
  
  function error() {
    output.innerHTML = "Unable to retrieve your location"
  }
  
  navigator.geolocation.getCurrentPosition(success, error);
}


