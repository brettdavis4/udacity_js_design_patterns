var initialCats = [
    {
        name: 'Rush',
        imgSrc: 'img/rush.jpg', 
        imgAttribution: '#',
        clickCount: 0, 
        nicknames : ['Rushter', 'Blue eyed devil', 'Masked Bandit']
    }, 
    {
        name: 'Ash', 
        imgSrc: 'img/ash.jpg', 
        imgAttribution: '#',
        clickCount: 0,
        nicknames : ['Pretty Grey Baby', 'Grey Grumpass']
    }, 
    {
        name: 'Kitty', 
        imgSrc: 'img/cat.jpg', 
        imgAttribution: '#',
        clickCount: 0,
        nicknames : ['Kit']
    }, 
    {
        name: 'Baby', 
        imgSrc: 'img/kitten.jpg', 
        imgAttribution: '#',
        clickCount: 0,
        nicknames : ['Bebe']
    }, 
    {
        name: 'Casper', 
        imgSrc: 'img/casper.jpg', 
        imgAttribution: '#',
        clickCount: 0,
        nicknames : ['Garfield']
    }
];

var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.nicknames = ko.observableArray(data.nicknames);
    
    this.title = ko.computed(function(){
        var title;
        var clicks = this.clickCount();
        
        if (clicks < 10) {
            title = 'Newborn';
        } else if (clicks < 50) {
            title = 'Infant';
        } else if (clicks < 100) {
            title = 'Child';
        } else if (clicks < 200) {
            title = 'Teen';
        } else if (clicks < 500) {
            title = 'Adult';
        } else {
            title = 'Ninja';
        }
        
        return title;
    }, this);
}

var ViewModel = function() {
    var self = this;
    
    this.catList = ko.observableArray([]);
    
    initialCats.forEach(function(catItem){
        self.catList.push( new Cat(catItem) );
    });
    
    this.currentCat = ko.observable( this.catList()[0] );
    
    this.incrementCounter = function() {
        this.clickCount(this.clickCount() + 1);
    };
    
    this.setCat = function(clickedCat){
        self.currentCat(clickedCat);
    };
}

ko.applyBindings(new ViewModel());