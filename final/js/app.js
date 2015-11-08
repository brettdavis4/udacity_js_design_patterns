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
            long: -86.15898479999998, 
            lat: 39.763996,
            comments: 'The burgers are not that good.  The eye candy makes up for it!',
            id: 2
        }, 
        {
            name: 'Buffalo Wild Wings',
            long: -86.15774650000003, 
            lat: 39.766832,
            comments: 'Great Burgers and Chicken Tenders!',
            id: 3
        }, 
        {
            name: 'Johnny Rockets',
            long: -86.15774650000003, 
            lat: 39.766832,
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
            long: -86.16042879999998, 
            lat: 39.7676157,
            comments: 'A tad pricy...',
            id: 7
        }, 
        {
            name: 'Punch Burger',
            long: -86.15492080000001, 
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
            long: -86.15859590000002, 
            lat: 39.7673992,
            comments: 'Another good date option.',
            id: 10
        }
];

var BurgerJoint = function(data) {
    this.id = ko.observable(data.id);
    this.name = ko.observable(data.name);
    this.long = ko.observable(data.long);
    this.lat = ko.observable(data.lat);
    this.comments = ko.observable(data.comments);
}

var ViewModel = function() {
    var self = this;
    self.searchInput = ko.observable('');
    
    this.burgerList = ko.observableArray([]);
    
    initialBurgerJoints.forEach(function(burgerItem){
        self.burgerList.push( new BurgerJoint(burgerItem) );        
        addmarker(burgerItem.lat, burgerItem.long, burgerItem.id, burgerItem.name, burgerItem.comments);
    });
    
    self.burgerList.sort(function (l, r) { return l.name() > r.name() ? 1 : -1 });
    
    self.currentFilter = ko.observable();
    
    self.filterResults = function(){
        var value = self.searchInput().toLowerCase();
        if(value != ''){
            self.burgerList(self.burgerList.filter(function(data){
                var startsWith = data.name.toLowerCase().startsWith(value);
                return burgerList;
            }));
        }
        return true;
    };
      
    self.showmap = function(data) {
        viewmarker(data.id());
    };      
}

ko.applyBindings(new ViewModel());