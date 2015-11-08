/* ======= Model ======= */
var model = {
    currentCat: null,
    cats: [
        {
            catname: 'Rush', 
            pic: 'img/rush.jpg', 
            count: 0
        }, 
        {
            catname: 'Ash', 
            pic: 'img/ash.jpg',
            count: 0
        }, 
        {
            catname: 'Kitty', 
            pic: 'img/cat.jpg', 
            count: 0
        }, 
        {
            catname: 'Baby', 
            pic: 'img/kitten.jpg', 
            count: 0
        }, 
        {
            catname: 'Casper',
            pic: 'img/casper.jpg', 
            count: 0
        }
    ]
};

/* ======= Octopus ======= */
var octopus = {
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.count++;
        catView.render();
    }
}


/* ======= View ======= */
var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('catdetail');
        this.catNameElem = document.getElementById('catname');
        this.catImageElem = document.getElementById('catimg');
        this.countElem = document.getElementById('catcount');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();

        this.countElem.innerHTML = currentCat.count;
        this.catNameElem.innerHTML = currentCat.catname;
        this.catImageElem.src = currentCat.pic;
    }
};

var catListView = {
    init: function() {
        // store the DOM element for easy access later
        this.ullist = document.getElementById('catlist');

        // render this view (update the DOM elements with the right values)
        this.render();
    },    
    
    render: function() { 
        var cat;
        var cats = octopus.getCats();
        
        for (i = 0; i < cats.length; i++ ){               
            cat = cats[i];
            
            var liitem = document.createElement('li');
            liitem.textContent = cats[i].catname;
            
            liitem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            this.ullist.appendChild(liitem);
        }
    }
};

// make it go!
octopus.init();