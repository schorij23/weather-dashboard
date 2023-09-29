// Setup my API Key
var apiKey="876fe47417eaaeff0f787d1ddd261473";
var city;
//assigns the html element/variable searchbtn to the id "search-button"
var searchBtn = document.getElementById("search-button")
searchBtn.addEventListener("click" , fetchWeather);


//Now this function does exist
function fetchWeather () {
//Gets the value the imput element id new city
var city = document.getElementById("new-city").value    
console.log(city);
var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
//used to find and update the data on the weather dash board 
    fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
//used to fetch and update the weather data on the dashboard
    .then(function (data){
        console.log(data);
        currentWeather(data);
    })
}

//function used to update the weather dashboard with the current weather conditions for any city
function currentWeather (data) {
    console.log(data)
    var todayWeather = document.getElementById ("current-weather");
    var cityName = document.createElement("h3");
    cityName.textContent=data.name
//update the weather dashboard with the city name, temperature, weather icon, and current date in a format that is appropriate for the user's locale
    var date=document.createElement("h3");
    const timestamp = data.dt * 1000;
    console.log(timestamp); // prints the corresponding JavaScript timestamp
    var date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    date.textContent=formattedDate;
//update the weather dashboard with the weather icon using the icon element
    var icon= document.createElement("img");
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//update the weather dashboard with the temperature using the temp element
    var temp = document.createElement("p");
    temp.textContent = data.main.temp
//update the weather dashboard with the city name, date, weather icon, and temperature for the current day.
    todayWeather.textContent="";
    todayWeather.append (cityName,date,icon,temp)
    console.log(data.coord);
    futureWeather(data.coord.lat, data.coord.lon);
}

function futureWeather (lat, lon) {
 var cityName = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
 fetch (cityName)
 .then(function (response) {
    return response.json();
 })

}
//todo still
// current city conditions does not show up
// icon link doesnt work
// no future conditions yet
// 5 day forcast only has labels no input
// no search history yet in for h4 pt1 class

//current weather done
//fetch find weather done



//  Display the curent and future weather to the user after grabing the city form the input text box
//  Build the URL to get data from server side
//  Display the 5 days forecast for the current city
//  Dynamically add the passed city on the search history
//  Display the past search again when the list group item is clicked in search history
//  Set up a function to render the data
//  Clear the search history from the page
//  Dont forget click event handlers


// Bard AI example answer to the hint question

// Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates 
//instead of just a city name. 
//Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?


// To retrieve geographical coordinates given a city name using the OpenWeatherMap APIs, you can use the Geocoding API. 
//The Geocoding API allows you to convert a location name (city name or area name) into geographical 
//coordinates (lat, lon).
// To use the Geocoding API, you will need to make a GET request to the following endpoint:
// https://api.openweathermap.org/geo/1.0/direct?q={city name}&appid={your API key}
// Replace {city name} with the name of the city that you want to get the geographical coordinates for. 
// Replace {your API key} with your OpenWeatherMap API key.

// The response from the Geocoding API will be a JSON object that contains the geographical coordinates 
//of the city that you specified. The lat and lon properties in the JSON object 
//contain the latitude and longitude coordinates of the city, respectively.

// Here is an example of a GET request to the Geocoding API to get the geographical coordinates of the city "London":
// https://api.openweathermap.org/geo/1.0/direct?q=London&appid={your API key}
// The response from the Geocoding API will be a JSON object like the following:
// JSON
// {
//   "count": 1,
//   "list": [
//     {
//       "id": 2643743,
//       "name": "London",
//       "country": "GB",
//       "lat": 51.5074,
//       "lon": -0.1278
//     }
//   ]
// }
// The lat and lon properties in the JSON object contain the latitude and longitude coordinates of London, respectively.
// Once you have retrieved the geographical coordinates of the city that you want to get the 5-day weather forecast for, you can pass the coordinates to the 5 Day Weather Forecast API.
// Here is an example of a GET request to the 5 Day Weather Forecast API to get the forecast for the city with the latitude and longitude coordinates 51.5074 and -0.1278, respectively:
// https://api.openweathermap.org/data/2.5/forecast/daily?lat=51.5074&lon=-0.1278&appid={your API key}
// The response from the 5 Day Weather Forecast API will be a JSON object that contains the weather forecast for the specified coordinates.