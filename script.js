//Set up the API key and city variable for to fetch weather data
var apiKey="876fe47417eaaeff0f787d1ddd261473";
var city;
//Get the search button element by its id search button
var searchBtn = document.getElementById("search-button");
//create click event on search button calls the function fetchweather
searchBtn.addEventListener("click" , fetchWeather);
// variable for the array that stores search history
var searchHistory = [];
//Get input for the id new city name then store it in the variable
var newCityInput = document.getElementById("new-city");
//Get id search button then store it in the variable
var searchButton = document.getElementById("search-button");
//Get id search history list and store in in the variable
var searchHistoryList = document.getElementById("search-history");

// Add a click event listener to searchHistoryList
searchHistoryList.addEventListener("click", function (e) {
//Checks if the clicked object has the same class as search button
    if (e.target.classList.contains("search-history-btn")) {
//Get the city name from the text content of the clicked element.
var city = e.target.textContent;
//Set value of new city input field to the city name
        newCityInput.value = city;
        // Find the corresponding latitude and longitude from your searchHistory array
var cityData = searchHistoryData.find((item) => item.city === city);
        if (cityData) {
var lat = cityData.lat;
var lon = cityData.lon;
// Call fetchWeather function with the latitude and longitude
            fetchWeather(lat, lon);
 // Call fetchFiveDayForecast function with the latitude and longitude
            fetchFiveDayForecast(lat, lon);
        }
    }
 });

//Function that adds search history
function addToSearchHistory(city,lat,lon) {
//Prevents duplicate city name searches
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
//Add button for history
var searchHistoryBtn = document.createElement("button")
// var listItem = document.createElement("li");
    searchHistoryBtn.textContent = city;
//Add class to the button
searchHistoryBtn.classList.add("search-history-btn");    
//event listener fo clicking the search button
searchHistoryBtn.dataset.city = city; // Store city name as a data attribute
searchHistoryBtn.dataset.lat = lat;   // Store latitude as a data attribute
searchHistoryBtn.dataset.lon = lon;   // Store longitude as a data attribute

//Append list item to the end of the searched list
searchHistoryList.appendChild(searchHistoryBtn);
searchHistoryData.push({ city, lat, lon });
}
}

//Event listener for saving the search history
searchButton.addEventListener("click", function () {
var city = newCityInput.value;
    if (city) {
//Add city to the history
        addToSearchHistory(city);
//Call fetchWeather function
        fetchWeather();
    }
});

// Array to store the search history data
var searchHistoryData = [];

//Function the fetch weather to 
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
//Call the displayForecast function with the coordinates
        displayForecast(data.coord.lat, data.coord.lon);
    });
}

//function used to update the weather dashboard with the current weather conditions for any city
function currentWeather (data) {
    console.log(data)
var todayWeather = document.getElementById ("current-weather");
var city = document.createElement("h3");
    city.textContent=data.name
//update the weather dashboard with the city name, temperature, weather icon, and current date in a format that is appropriate for the user's locale
var date=document.createElement("h3");
var timestamp = data.dt * 1000;
    console.log(timestamp); // prints the corresponding JavaScript timestamp
var date = new Date(timestamp);
var options = { year: 'numeric', month: 'long', day: 'numeric' };
var formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    date.textContent= formattedDate;
//update the weather dashboard with the weather icon using the icon element
var icon= document.createElement("img");
    icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
//update the weather dashboard with the temperature using the temp element
var temp = document.createElement("p");
    temp.textContent = "Temp: " + data.main.temp  + " \u00B0F";
//update the weather dashboard with the wind speed using the windconvert wind from meter per second to miles per hour
const windSpeedMetPS = data.wind.speed;
// const windSpeedMPH = windSpeedMetPS * 2.23694;
//create element wind speedand display in "current weather"
var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + windSpeedMetPS + " mph";
//create element humid and display in "current weather"
var humid = document.createElement("p");
    humid.textContent = "Humidity " +data.main.humidity + "\%";
//update dashboard with the city name, date, icon, temp , wind for the current day.
    todayWeather.textContent="";
//Displays the current weather
    todayWeather.append (city,date,icon,temp,windSpeed,humid)
    console.log(data.coord);
//call the fetch forecast based on coordinates
    fetchFiveDayForecast(data.coord.lat, data.coord.lon);
}
//Function to fetch the 5-day forecast based on latitude and longitude
function fetchFiveDayForecast(lat, lon) {
//api ket to extract 5 day forcast
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
//Extract the data from the API response based on location and time period
var forecastData = data.list;
console.log(data);

//Get a reference to the forecast container in your HTML
var forecastContainer = document.getElementById('forecast-container');
//Clear previous forecast
    forecastContainer.textContent = '';
//For loop through the forecast and create cards
for (i=0; i < forecastData.length; i+=8) {
let forecast = forecastData[i];

//Extract date and time
var dateTime = forecast.dt_txt;
const formattedDate = new Date(dateTime).toLocaleDateString('en-US', {weekday:'long', year: 'numeric', month: 'long', day: 'numeric' });

console.log(formattedDate);
//update the weather dashboard with the weather icon using the icon element
var iconSrc = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`
//Extract temperature
var temperature = forecast.main.temp;
var temperatureTrim = temperature.toFixed(0);
//Extract windspeed
var windS = forecast.wind.speed;
var windSTrim = windS.toFixed(1);
//Extract humidity
var humidity = forecast.main.humidity;
//Add a div to the forecast card variable
var forecastCard = document.createElement('div');

//Adds css to the forcast card
    forecastCard.classList.add('col-md-2', 'mb-3');
//Adds the id forecast card to the div
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

//Function to display the 5-day forecast
function displayForecast(lat, lon) {
    fetchFiveDayForecast(lat, lon);
}