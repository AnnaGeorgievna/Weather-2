let now = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let day = days[now.getDay()];
let currentDate = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h2.innerHTML = `${day} ${currentDate} of ${month}, ${hours}:${minutes}`;

function convertToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 19;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

function convertToFarehheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = 66;
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertToFarehheit);

function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  const searchInput = document.querySelector("#city-search");
  const searchValue = searchInput.value;
  h1.innerHTML = searchValue;
  let units = "metric";
  let apiKey = "6ad1060a55a617ecfcf5f36a0fb93c65";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(temp);
}

let form = document.querySelector("#input-form");
form.addEventListener("submit", search);

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console;
  let units = "metric";
  let apiKey = "6ad1060a55a617ecfcf5f36a0fb93c65";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(temp);
}

function temp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temp");
  currentTemperature.innerHTML = `${temperature}`;
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = ` ${response.data.main.humidity}% `;
  let windSpeed = document.querySelector("#windy");
  let speed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${speed} km/h `;
  let feelLike = document.querySelector("#feel");
  let tempFeelLike = Math.round(response.data.main.feels_like);
  feelLike.innerHTML = `${tempFeelLike}°`;
  let icon = document.querySelector("#icon");
  icon.innerHTML=response.data
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

function getForecast(coordinates) {
  let apiKey = "6ad1060a55a617ecfcf5f36a0fb93c65";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
