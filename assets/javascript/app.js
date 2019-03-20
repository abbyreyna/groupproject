                
var x = document.getElementById("userLocation");
var latUser = "";
var lngUser = "";

function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}
}
function showPosition(position) {

x.innerHTML = "Latitude: " + position.coords.latitude + 
"<br>Longitude: " + position.coords.longitude;

latUser = position.coords.latitude;
lngUser = position.coords.longitude;

//Access to trails with Lat & Lon
    
var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latUser +"&lon=" + lngUser + "&maxDistance=10&key=200430269-7625402c2fab0719cfcddb27c1c9a81c";
//console.log(queryURL);

//airquality API combined with user's lat & lng
var airqURL = "https://api.airvisual.com/v2/nearest_city?lat=" + latUser + "&lon=" + lngUser + "&key=zATseQrGoQx73DZX2";
console.log(airqURL);

$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
    //console.log(response);
    var results = response.trails;
    

    for (var i=0 ; i<results.length ; i++){
      var tRow = $("<tr>");
      var titleTd = $("<td scope = 'col'>");
      var summaryTd = $("<td scope = 'col'>");
      var locationTd = $("<td scope = 'col'>");

      titleTd.text(results[i].name);
      summaryTd.text(results[i].summary);
      locationTd.text(results[i].location);

      console.log(results[i]);
      
      tRow.append(titleTd,summaryTd,locationTd);

      $("#tableBody").append(tRow);
      
    };
      
  });
};

const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
    $(userLocation).empty();  
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}




