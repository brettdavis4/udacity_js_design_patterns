var auth = {
  consumerKey: "-BniUiKB-N6v3CvXd-zTsg",
  consumerSecret: "d7bxrnwhdgjuHW9Eu5Uz0gxoREo",
  accessToken: "JbTFDVc1uq7W1MyrBQHpfvGFkH13OFuO",
  accessTokenSecret: "xC7re40MACooIPlfnIAPveYnrxw",
  serviceProvider: {
    signatureMethod: "HMAC-SHA1"
  }
};

//create the initial map and markers arrays
var map;
var markers = [];
var markersclone = [];

var infowindow = new google.maps.InfoWindow({size: new google.maps.Size(150,50)});

//Load the map and have it set to Indianapolis, IN.
function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 16,        
      center: new google.maps.LatLng(39.7683, -86.1581)
    });
    
    //This addListener event will only allow for one infowindow to appear on the screeen
    google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
    });
}

//add marker to initial arrays
function addmarker(lat,lng, id, name, comments){

    var phone = '';
    var address = '';
    var city = '';
    var state = '';
    var zip = '';
    var rating = '';
    var yelpcontent = '<h4>' + name + '</h4>';

    var terms = name;
    var near = 'Indianapolis,IN';
    var cll = lat + "," + lng;
    var accessor = {
      consumerSecret: auth.consumerSecret,
      tokenSecret: auth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['term', name]);
    parameters.push(['location', 'Indianapolis, IN']);
    parameters.push(['cll', cll]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
    var message = {
      'action': 'http://api.yelp.com/v2/search',
      'method': 'GET',
      'parameters': parameters
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
    $.ajax({
      'url': message.action,
      'data': parameterMap,
      'cache': true,
      'dataType': 'jsonp',
      'jsonpCallback': 'cb',
      'type' : 'get',
      'timeout': 4000,
      'success': function(data, textStats, XMLHttpRequest) {
          address = data['businesses'][0].location.address;
          city = data['businesses'][0].location.city;
          state = data['businesses'][0].location.state_code;
          zip = data['businesses'][0].location.postal_code;
          phone = data['businesses'][0].display_phone;
          rating = data['businesses'][0].rating_img_url_small;          
          yelpcontent = yelpcontent + '<p>' + address + '<br/>' + city + ', ' + state + '  ' + zip + '<br/>' + phone + '</p><p><strong>Yelp Rating</strong></p><p><img src=' + rating + '></p><p><strong>Personal Review</strong></p><p>' + comments + '</p>';
          
      }
    });    

    
  var latlng = new google.maps.LatLng(lat, lng); 
    
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: name,
    name: id
  });
    
  marker.addListener('click', function() {
      infowindow.setContent(yelpcontent); 
      infowindow.open(map, marker);
  });
    
  markers.push(marker);
  markersclone.push(marker);
}

//function to allow the list on the left to control the map
function viewmarker(id){
    google.maps.event.trigger(markers[id-1], "click");
};

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markersclone.length; i++) {
    markersclone[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  markers = [];
}

function showMarkers() {
  setMapOnAll(map);
}

//Load the map
initialize();