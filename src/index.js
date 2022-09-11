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

function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  const searchInput = document.querySelector("#city-search");
  const searchValue = searchInput.value;
  h1.innerHTML = searchValue;
  getCityWeather(searchValue);
}
function getCityWeather(city) {
  let units = "metric";
  let apiKey = "6ad1060a55a617ecfcf5f36a0fb93c65";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  if (city) {
    axios.get(apiUrl).then(temp);
  } else {
    alert("Please enter your city");
  }
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

function timeConvert(timestamp) {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const updateHours = hours < 10 ? "0" + hours : hours;
  const updateMinutes = minutes < 10 ? "0" + minutes : minutes;
  let time = updateHours + ":" + updateMinutes;
  return time;
}

function temp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temp");
  let tempFeelLike = Math.round(response.data.main.feels_like);
  let feelLike = document.querySelector("#feel");
  let pressure = document.querySelector("#pressure");
  let sunrise = document.querySelector("#sunRise");
  let sunset = document.querySelector("#sunSet");
  let windSpeed = document.querySelector("#windy");
  let speed = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#hum");
  let information = document.querySelector("#info");
  let icon = document.querySelector("#icon");
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;

  humidity.innerHTML = ` ${response.data.main.humidity}% `;
  currentTemperature.innerHTML = `${temperature}`;
  windSpeed.innerHTML = `${speed} km/h `;
  feelLike.innerHTML = `${tempFeelLike}°`;
  pressure.innerHTML = `Pressure ${response.data.main.pressure} hPa`;
  sunrise.innerHTML = timeConvert(response.data.sys.sunrise);
  sunset.innerHTML = timeConvert(response.data.sys.sunset);
  information.innerHTML = `${response.data.weather[0].description}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

function getForecast(coordinates) {
  let apiKey = "22cfc19c6b9ae4b5cf96686bcd869368";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  axios.get(apiUrl).then(displayForecastByHours);
}

function displayForecast(response) {
  let forecastDay = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastDay.forEach(function (dayWeather, index) {
    if (index >= 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast-date">${formatDay(dayWeather.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            dayWeather.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            dayWeather.temp.max
          )}° </span> 
          <span class="weather-forecast-temperature-min"> ${Math.round(
            dayWeather.temp.min
          )}° </span>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getHours(timestamp) {
  let forecastHour = new Date(timestamp * 1000);

  let time = forecastHour.getHours();
  return time;
}
function displayForecastByHours(response) {
  let forecastByHours = response.data.hourly;
  let forecastElementHours = document.querySelector("#forecastHours");
  let hoursHTML = "";
  forecastByHours.forEach(function (forecastHour, index) {
    if (index >= 0 && index < 9) {
      hoursHTML =
        hoursHTML +
        `<div class=weatherByHours>
        <div class="weather-forecast-date">${getHours(
          forecastHour.dt
        )}:00 </div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastHour.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastHour.temp
          )}° </span>
      </div>`;
    }
  });
  forecastElementHours.innerHTML = hoursHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
getCityWeather("Kyiv");
