var cats = [{"catname": "Rush", "pic": "rush.jpg", "count": 0}, {"catname": "Ash", "pic": "ash.jpg", "count": 0}, {"catname": "Kristin", "pic": "cat.jpg", "count": 0}, {"catname": "Baby", "pic": "kitten.jpg", "count": 0}, {"catname": "Casper", "pic": "casper.jpg", "count": 0}];
  
function init() {
    var catid;    
    
    for (i = 0; i < cats.length; i++ ){               
        var ullist = document.getElementById("catlist");
        
        var liitem = document.createElement("li");
        liitem.innerHTML = cats[i].catname;
        
        ullist.appendChild(liitem);
        
        (function(i){
        liitem.addEventListener('click', function(){
            catid = i;
            document.getElementById("catname").innerHTML = cats[i].catname;
            document.getElementById("catimg").src = cats[i].pic;
            document.getElementById("catcount").innerHTML = cats[i].count;
        }, false);
        })(i) 
        
    }  
    
    var catimg = document.getElementById("catimg");
    catimg.addEventListener('click', function(){
      //the element has been clicked... do stuff here
      var count = parseInt(document.getElementById("catcount").innerHTML) + 1;           
      
      cats[catid].count = count;             
      document.getElementById("catcount").innerHTML = count;
    }, false);
}

window.onload = init; 