
var x = document.getElementById("demo");
var y = document.getElementById("forecast");
var lat;
var long;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
lat = position.coords.latitude;
long = position.coords.longitude;

  x.innerHTML = 
  "<br>Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;

}
var latitude, longitude;
var forecast;
$(document).ready(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
    } else {
        alert('Device probably not ready.');
    }
});
function handle_errors(error) {  
    // error handling here
}
function handle_geolocation_query(position){  
    latitude = (position.coords.latitude);
    longitude = (position.coords.longitude); 
 onPositionReady();
}
function onPositionReady() {
    console.log(latitude);
    // proceed
   




  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  };
  xhttp.open("GET", "https://api.weather.gov/points/"+ latitude +","+ longitude, true);
 xhttp.onload = function() {
  // Begin accessing JSON data here
    var data = JSON.parse(this.response)

  if (xhttp.status >= 200 && xhttp.status < 400) {
     forecast = (data.properties.forecast);
      console.log(data.properties.forecast);
    var request = new XMLHttpRequest();
console.log(forecast);
request.open('GET', forecast, true);
request.onload = function() {
  // Begin accessing JSON data here
  var list = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
 for(var i = 0; i < list.properties.periods.length; i++)
{
    var item = list.properties.periods[i];
y.innerHTML =  "Date: " + item.name + "<br>Temperature: " +item.temperature + " "+item.temperatureUnit + "<br>Forecast: " + item.detailedForecast;

    
}
            
  } else {
    console.log('error')
  }
}

request.send()
  } else {
    console.log('error')
  }
}
  xhttp.send();


}
     