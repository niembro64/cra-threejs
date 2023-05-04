(function () {
    var parallax = document.querySelectorAll("body"),
        speed = 0.5;

    window.onscroll = function () {
        [].slice.call(parallax).forEach(function (el, i) {
            var windowYOffset = window.pageYOffset,
                elBackgrounPos = "50% " + windowYOffset * speed + "px";

            el.style.backgroundPosition = elBackgrounPos;
        });
    };
})();

var m = document.getElementById("mobileqr");
var q = document.getElementById("qrqr");

var clicked = true;
function growQr(ele) {
    if (clicked) {

        // m.style["width"] = "100px";
        m.style["height"] = "150px";
        q.style["height"] = "80px";
        
        
        // m.style["width"] = "100px";
        // m.style["height"] = "100px";
        // m.style["border"] = "2px solid black";
        // m.style["border-radius"] = "4px";
        clicked = false;
    } else {
        
        // m.style["width"] = "10px";
        m.style["height"] = "0px";
        q.style["height"] = "0px";


        // m.style["width"] = "0px";
        // m.style["height"] = "0px";
        // m.style["border"] = "0px";
        // m.style["border-radius"] = "0px";
        clicked = true;
    }
}


var counterContainer = document.querySelector("#visits");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;



// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(function(position){
//         console.log(position.coords.longitude)
//         console.log(position.coords.latitude)

//         var long = position.coords.longitude;
//         var lat = position.coords.latitude
//     })
// }else{
//     console.log("Geolocation is not supported by this device/browser")
// }
var  ref = document.referrer;
var  href =  location.href;
var agent = navigator.userAgent;

fetch("https://ipapi.co/json/")
.then(response=>response.json())
.then((responseJson=>{

    // var city = responseJson.city;
    // var country = responseJson.country; 
    var location =  responseJson.city + ", " + responseJson.region + " (" + responseJson.country + ")";
    document.querySelector("#city").innerHTML=location;
    document.querySelector("#ip").innerHTML=responseJson.ip;
    // document.querySelector("#region").innerHTML=responseJson.region;
    // document.querySelector("#country").innerHTML=responseJson.country;

    console.log(responseJson)
}))
