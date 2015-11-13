function getyelpinfo(name,lat,lng,comments){

    var yelpcontent = '<h4>' + name + '</h4>';

    var phone = '';
    var address = '';
    var city = '';
    var state = '';
    var zip = '';
    var rating = '';


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
        'type' : 'get',
        'timeout': 15000,
        'success': function(data, textStats, XMLHttpRequest) {


            address = data['businesses'][0].location.address;
            city = data['businesses'][0].location.city;
            state = data['businesses'][0].location.state_code;
            zip = data['businesses'][0].location.postal_code;
            phone = data['businesses'][0].display_phone;
            rating = data['businesses'][0].rating_img_url_small;
            yelpcontent = yelpcontent + '<p>' + address + '<br/>' + city + ', ' + state + '  ' + zip + '<br/>' + phone + '</p><p><strong>Yelp Rating</strong></p><p><img src=' + rating + '></p><p><strong>Personal Review</strong></p><p>' + comments + '</p>';

        },
        'error': function(data, textStats, XMLHttpRequest) {
            console.log(name + ' ' + 'did not work');
            console.log(XMLHttpRequest);
            yelpcontent = yelpcontent + '<p>' + comments + '</p>';
        }
    });

    yelpcontent = yelpcontent + '<p><strong>Personal Review</strong></p><p>' + comments + '</p>';
    return yelpcontent;
}

