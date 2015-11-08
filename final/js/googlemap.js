var gmarkers = [];

var map = new google.maps.Map(document.getElementById('map-canvas'), {
  zoom: 16,
  center: new google.maps.LatLng(39.7683, -86.1581)
});


function addmarker(lat,lng, id, name, comments){
  var latlng = new google.maps.LatLng(lat, lng); 
  var yelpinfo = getyelpinfo(name, lat, lng, comments);
    
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: name,
    name: id
  });

  var infowindow = new google.maps.InfoWindow({
    //content: '<p>' + name + '</p><p>' + comments + '</p>'
      
    content: yelpinfo
  });
    
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
    
  gmarkers.push(marker);

}

function viewmarker(id){
    google.maps.event.trigger(gmarkers[id-1], "click");
};

