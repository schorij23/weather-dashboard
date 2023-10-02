//Set up the API key and city variable for to fetch weather data
var apiKey="876fe47417eaaeff0f787d1ddd261473";
var city;
//Get the search button element by its id search button
var searchBtn = document.getElementById("search-button");
//Create click event on search button calls the function fetchweather
searchBtn.addEventListener("click" , fetchWeather);

//Variable for the array that stores search history
var searchHistory = [];
//Variable fot the array that store the search history data
var searchHistoryData = [];
//Get input for the id new city name then store it in the variable
var newCityEl = document.getElementById("new-city");
//Get id search button then store it in the variable
var searchButton = document.getElementById("search-button");
//Get id search history list and store in in the variable
var searchHistoryList = document.getElementById("search-history");

// Add a click event listener to searchHistoryList
searchHistoryList.addEventListener("click", function (e) {

    //Checks if the clicked object has the same class as search button
    if (e.target.classList.contains("search-history-btn")) {
//Get city name from text content of the clicked element
var city = e.target.textContent;
//Set new city input value to city name
        newCityEl.value = city;
//Search for city data in the searchHistoryData array if the city properties match
var cityEl = searchHistoryData.find((search) => search.city === city);
//Check if exists and extract lat and lon to cityEl
        if (cityEl) {
var lat = cityEl.lat;
var lon = cityEl.lon;
//FetchWeather function based on the lat and lon
    fetchWeather(lat, lon);
//FetchFiveDayForecast with the latitude and longitude
    fetchFiveDay(lat, lon);
        }
    }
 });

//Function that adds search history to the cities
function addToSearch(city,lat,lon) {

    //Prevents duplicate city names in history
    if (!searchHistory.includes(city)) {
//Push the city to the searchHistory array        
        searchHistory.push(city);
//Add button for search history
var searchHistoryBtn = document.createElement("button")
//Set the button textcontent to the city name
searchHistoryBtn.textContent = city;
//Add a class search-history-btn to the button
searchHistoryBtn.classList.add("search-history-btn");    
//Variables to store city name latitude and longitude as a data attribute
searchHistoryBtn.setAttribute("data-city", city);
searchHistoryBtn.setAttribute("data-lat", lat); 
searchHistoryBtn.setAttribute("data-lon", lon);  

//Adds list item to the end the array list
searchHistoryList.appendChild(searchHistoryBtn);
//Adds city lat and lon to the search history data array
searchHistoryData.push({ city, lat, lon });
    }
}

//Click Event listener for saving the search button history
searchButton.addEventListener("click", function () {

    //Get the value of the new City Element input field    
var city = newCityEl.value;
//If a city is entered add to the functioons
    if (city) {
//Calls the addToSearch function that adds city to the search
        addToSearch(city);
//Call fetchWeather function to fetch weather for the city
        fetchWeather();
    }
});



//Function the to fetch weather 
function fetchWeather () {

//Variable to get city name from the input using id "new-city"
var city = document.getElementById("new-city").value   
//Use console log for debugging var city
console.log(city);
//Open weather map API URL with the city, apiKey, and imperial units
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"; 
//Fetch API to uses GET request to the weather API
    fetch(weatherUrl)    
    .then(function (response) {
//Parse to response to json format        
      return response.json();
    })

    .then(function (data){
//Use console log for debugging weather data
        console.log(data);
//Calls the currentWeather function to display current weather data on the dashboard
        currentWeather(data);
//Calls the displayForecast function with the coordinates
        displayForecast(data.coord.lat, data.coord.lon);
    });
}

//Function to update weather dashboard with the current weather data conditions
function currentWeather (data) {
    
    console.log(data)
//Variable to get the element where you display the current weather    
var todayWeather = document.getElementById ("current-weather");
//Create h3 element for city name and set content
var city = document.createElement("h3");
    city.textContent=data.name
//Convert the Unix timestamp to readable date
var date=document.createElement("h3");
var timestamp = data.dt * 1000;
//Prints the JavaScript timestamp
    console.log(timestamp);
//Format date to day month date year    
var date = new Date(timestamp);
var options = { year: 'numeric', month: 'long', day: 'numeric' };
var formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    date.textContent= formattedDate;
//Create img element for the weather icon and set its api source
var icon= document.createElement("img");
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//Create p element for temperature and set content
var temp = document.createElement("p");
    temp.textContent = "Temp: " + data.main.temp  + " \u00B0F";
//Convert wind speed to mph (if it's in meters per second)
var windSpeedMetPS = data.wind.speed;
//Create p element for wind speed and set content
var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + windSpeedMetPS + " mph";
//Create p element humididy and set content
var humid = document.createElement("p");
    humid.textContent = "Humidity " +data.main.humidity + "\%";
//Clear existing remaining text content from today weather
    todayWeather.textContent="";
 //Append all elements in order to the todayWeather element
    todayWeather.append (city,date,icon,temp,windSpeed,humid)
    console.log(data.coord);
//Call the fetchFiveDay function with lat and lon coordinates
    fetchFiveDay(data.coord.lat, data.coord.lon);
}
//Function to fetch the 5-day forecast based on lat and lon
function fetchFiveDay(lat, lon) {
//API URL to fetch tfive-day forecast data
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
//Use fetch API to make a GET request to the openweathermap API    
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
//Variable used to extract list of forecast data from API
var forecastData = data.list;
console.log(data);

//Get a reference to html forecastContainer used to display the forecast
var forecastContainer = document.getElementById('forecast-container');
//Clear the previous content in the forecastContainer
    forecastContainer.textContent = '';
//For Loop through the forecast data (at every 8th element to get 24 hour forecast)
for (i=0; i < forecastData.length; i+=8) {
let forecast = forecastData[i];

//Get formated date and time
var dateTime = forecast.dt_txt;
const formattedDate = new Date(dateTime).toLocaleDateString('en-US', {weekday:'long', year: 'numeric', month: 'long', day: 'numeric' });

console.log(formattedDate);

//Get weather icon using the icon url
var iconSrc = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`
//Get temperature and format
var temperature = forecast.main.temp;
var temperatureTrim = temperature.toFixed(0);
//Get windspeed and format
var windS = forecast.wind.speed;
var windSTrim = windS.toFixed(1);
//Get the humidity
var humidity = forecast.main.humidity;
//Add a div to the forecast card
var forecastCard = document.createElement('div');

//Adds bootstrap css to the forcast card
    forecastCard.classList.add('col-md-2', 'mb-3');
//Set the inner HTML of the card with the formatted data
    forecastCard.innerHTML = 
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">${formattedDate}</h5>
                <img src="${iconSrc}">
                <p class="card-text">Temp ${temperatureTrim}°F</p>
                <p class="card-text">Wind-Speed ${windSTrim} mph</p>
                <p class="cart-text">Humidity ${humidity}%</p>
            </div>
        </div>`;

//Append the card to the container
            forecastContainer.appendChild(forecastCard);
        };
    })   
}

//Function to fetch and display the 5-day forecast
function displayForecast(lat, lon) {
//Call fetchFiveDay function with lat and lon coordinates
    fetchFiveDay(lat, lon);
}