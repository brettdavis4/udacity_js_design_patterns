//yelp authorization keys
var auth = {
    consumerKey: "-BniUiKB-N6v3CvXd-zTsg",
    consumerSecret: "d7bxrnwhdgjuHW9Eu5Uz0gxoREo",
    accessToken: "JbTFDVc1uq7W1MyrBQHpfvGFkH13OFuO",
    accessTokenSecret: "xC7re40MACooIPlfnIAPveYnrxw",
    serviceProvider: {
        signatureMethod: "HMAC-SHA1"
    }
};

//array of places that sell burgers around downtown Indy
var initialBurgerJoints = [
    {
        name: 'Bru Burger',
        long: -86.1521353,
        lat: 39.773332,
        comments: 'Really great burgers!',
        id: 1
    },
    {
        name: 'Hooters',
        long: -86.1589847,
        lat: 39.763996,
        comments: 'Nice eye candy!',
        id: 2
    },
    {
        name: 'Buffalo Wild Wings',
        long: -86.1577465,
        lat: 39.766832,
        comments: 'Great Burgers and Chicken Tenders!',
        id: 3
    },
    {
        name: 'Johnny Rockets',
        long: -86.159322,
        lat: 39.766304,
        comments: 'Awesome burgers and shakes!',
        id: 4
    },
    {
        name: 'Champps',
        long: -86.159322,
        lat: 39.766304,
        comments: 'A great place to take a date!',
        id: 5
    },
    {
        name: 'Steak n Shake',
        long: -86.1604696,
        lat: 39.7651971,
        comments: 'An oldie, but a goodie!',
        id: 6
    },
    {
        name: 'Webber Grill',
        long: -86.1604287,
        lat: 39.7676157,
        comments: 'A tad pricy...',
        id: 7
    },
    {
        name: 'Punch Burger',
        long: -86.1549208,
        lat: 39.7696918,
        comments: 'N/A',
        id: 8
    },
    {
        name: 'The Tap',
        long: -86.1543125,
        lat: 39.7714791,
        comments: 'Good Burger for the price.',
        id: 9
    },
    {
        name: 'Rock Bottom Brewery',
        long: -86.1585959,
        lat: 39.7673992,
        comments: 'Another good date option.',
        id: 10
    },
    {
        name: 'Scotty\'s Brewhouse',
        long: -86.155982,
        lat: 39.766022,
        comments: 'Great Burgers.',
        id: 11
    },
    {
        name: 'Hard Rock Cafe',
        long: -86.157782,
        lat: 39.765869,
        comments: 'Food is ok.  The memorabilia is nice!',
        id: 12
    },
    {
        name: 'Howl at the Moon',
        long: -86.157444,
        lat: 39.764494,
        comments: 'I have no idea how the burgers are.',
        id: 13
    },
    {
        name: 'Tilted Kilt',
        long: -86.157989,
        lat: 39.764552,
        comments: 'I have no idea how the burgers are.',
        id: 14
    },
    {
        name: 'Coaches Tavern',
        long: -86.156576,
        lat: 39.766193,
        comments: 'I have no idea how the burgers are.',
        id: 15
    },
    {
        name: 'Slippery Noodle Inn',
        long: -86.158654,
        lat: 39.761653,
        comments: 'I have no idea how the burgers are.',
        id: 16
    },
    {
        name: 'Bourbon Street Distillery',
        long: -86.162820,
        lat: 39.772674,
        comments: 'I have no idea how the burgers are.',
        id: 17
    },
    {
        name: 'McCormick & Schmick\'s Seafood & Steaks',
        long: -86.160335,
        lat: 39.768802,
        comments: 'There is a great happy hour deal here on burgers.',
        id: 18
    },
    {
        name: 'Champion\'s Sports Bar',
        long: -86.164766,
        lat: 39.766227,
        comments: 'I have no idea how the burgers are.',
        id: 19
    },
    {
        name: 'Kilroys Bar & Grill',
        long: -86.157713,
        lat: 39.764073,
        comments: 'I have no idea how the burgers are.',
        id: 20
    },
    {
        name: 'Plow & Anchor',
        long: -86.156049,
        lat: 39.779042,
        comments: 'I have no idea how the burgers are.',
        id: 21
    }
];

//data object of a burger joint
var BurgerJoint = function(data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.long = ko.observable(data.long);
    this.lat = ko.observable(data.lat);
    this.comments = ko.observable(data.comments);
}

//Knockout.JS Viewmodel
var ViewModel = function() {
    var self = this;
    //search box on site
    self.searchInput = ko.observable('');

    //ko arrays  burgerlist can be filtered and burgerlist clone contains everything
    this.burgerList = ko.observableArray([]);
    this.burgerListClone = ko.observableArray([]);

    initialBurgerJoints.forEach(function(burgerItem){
        //add items from the burgerlist array to the ko array
        self.burgerList.push( new BurgerJoint(burgerItem) );
        self.burgerListClone.push( new BurgerJoint(burgerItem) );
        //add a marker to the google map
        addmarker(burgerItem.lat, burgerItem.long, burgerItem.id, burgerItem.name, burgerItem.comments);
    });

    //sort the ko arrays alphabetically
    self.burgerList.sort(function (l, r) { return l.name() > r.name() ? 1 : -1 });
    self.burgerListClone.sort(function (l, r) { return l.name() > r.name() ? 1 : -1 });

    //filter function.  This is what filters the display on the left
    self.filterResults = function(){
        var value = self.searchInput().toLowerCase();
        if(value != ''){
            self.burgerList(self.burgerList().filter(function(data){
                 return data.name().toLowerCase().startsWith(value); 
             }));
             clearMarkers();
             self.burgerList().forEach(function(data){
                 addmarker(data.lat(), data.long(), data.id(), data.name(), data.comments());
             });
        }else{
            showMarkers();
            self.burgerList(self.burgerListClone());
        }
    };

    //this is the clickevent that displays the location on the map
    self.showmap = function(data) {
        viewmarker(data.id());
    };
}

ko.applyBindings(new ViewModel());
