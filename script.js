//Todo 

//  Search the city to make sure it exists
//  Setup API Key
var apiKey="876fe47417eaaeff0f787d1ddd261473";
var searchbtn = document.getElementById("new-city")
searchbtn.addEventListener("click" , handleSearch); 
function handleWeather () {
var city = document.getElementById("city-name").value
fetchWeather (city)
}

function fetchWeather (city) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
        console.log(data);
        currentWeather(data);
    })
}

function currentWeather (data) {
    var todayWeather = document.getElementById ("today-weather");
    var cityName = document.createElement("h3");
    cityName.textContent=data.name
    var date=document.createElement("h3");
    date.textContent=data.dt;
    var icon= document.createElement("img");
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    var temp = document.createElement("p");
    temp.textContent = data.main.temp
    todayWeather.append (cityName,date,icon,temp)
}


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
