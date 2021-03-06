var cats = [{"catname": "Rush", "pic": "rush.jpg", "count": 0}, {"catname": "Ash", "pic": "ash.jpg", "count": 0}, {"catname": "Kristin", "pic": "cat.jpg", "count": 0}, {"catname": "Baby", "pic": "kitten.jpg", "count": 0}, {"catname": "Casper", "pic": "casper.jpg", "count": 0}];
  
function init() {
    for (i = 0; i < cats.length; i++ ){               
        var d = document.createElement("div");
        d.className = "cat";
        d.id = cats[i].catname;
        d.innerHTML = cats[i].catname + "<br/>";

        var img = document.createElement("img");
        img.src = cats[i].pic;              

        var dcount = document.createElement("div");
        dcount.id = cats[i].catname + "-count";
        dcount.innerHTML = cats[i].count;

        d.appendChild(img);
        d.appendChild(dcount);

        (function(i){
        img.addEventListener('click', function(){
            //If I really gave a damn, I'd add a function to update the count value in the array.
            var count = parseInt(document.getElementById(cats[i].catname + "-count").innerHTML) + 1;
            document.getElementById(cats[i].catname + "-count").innerHTML = count;
        }, false);
        })(i)                

        document.body.appendChild(d);           
    }  
}

window.onload = init; 