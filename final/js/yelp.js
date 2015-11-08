var auth = {
  consumerKey: "-BniUiKB-N6v3CvXd-zTsg",
  consumerSecret: "d7bxrnwhdgjuHW9Eu5Uz0gxoREo",
  accessToken: "JbTFDVc1uq7W1MyrBQHpfvGFkH13OFuO",
  accessTokenSecret: "xC7re40MACooIPlfnIAPveYnrxw",
  serviceProvider: {
    signatureMethod: "HMAC-SHA1"
  }
};

function getyelpinfo(name,lat,long,comments){
    var placename ='';
    var phone = '';
    var address = '';
    var city = '';
    var state = '';
    var zip = '';
    var rating = '';
    var yelpcontent = '';

    var terms = name;
    var near = 'Indianapolis,IN';
    //var cll = lat + "," + long;
    var accessor = {
      consumerSecret: auth.consumerSecret,
      tokenSecret: auth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    //parameters.push(['cll', cll]);
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
    //console.log(parameterMap);
    $.ajax({
      'url': message.action,
      'data': parameterMap,
      'cache': true,
      'dataType': 'jsonp',
      'jsonpCallback': 'cb',
      'success': function(data, textStats, XMLHttpRequest) {
          /*console.log(data);
          console.log(data['businesses'][0].name);
          console.log(data['businesses'][0].display_phone);
          console.log(data['businesses'][0].location.address);
          console.log(data['businesses'][0].location.city);
          console.log(data['businesses'][0].location.state_code);
          console.log(data['businesses'][0].location.postal_code);
          console.log(data['businesses'][0].rating_img_url_small);*/   

          placename = data['businesses'][0].name;
          phone = data['businesses'][0].display_phone;
          address = data['businesses'][0].location.address;
          city = data['businesses'][0].location.city;
          state = data['businesses'][0].location.state_code;
          zip = data['businesses'][0].location.postal_code;
          rating = data['businesses'][0].rating_img_url_small;

          yelpcontent = '<h2>' + placename + '</h2>';
              //<p>' + address + '<br/>' + city + ', ' + state + '  ' + zip + '<br/>' + phone + '</p>' + '<p>Yelp Rating: <img src=' + rating + '></p><p><strong>Personal Review</strong></p><p>' + comments + '</p>;
          
      }
    });
    
    return yelpcontent;
}

