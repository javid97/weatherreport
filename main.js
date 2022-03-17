"use strict"
let input = document.getElementById("search");
let btn = document.querySelector(".fa-search");
let weatherCondition = document.getElementById("weatherCondition");
let mainHeading = document.querySelector(".mainHeading");
let cloud1 = document.querySelector(".cloud1");
let cloud2 = document.querySelector(".cloud2");
let cloud3 = document.querySelector(".cloud3");
let emptyInput = document.querySelector(".emptyInput");
const weatherUpadateContainer = document.querySelector(".weatherUpadateContainer");
const visuals = document.getElementById("visuals");
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "df401346306992b0bafdda5b176a1970";

document.addEventListener("DOMContentLoaded", () => {
  if (navigator)
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchDataOnLoad(lat, lon);
    });
});

const fetchDataOnLoad = async (lat, lon) => {
  const API_ON_LOAD = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await fetch(API_ON_LOAD);
    if (!response.ok) throw new Error("city couldn't find");
    const data = await response.json();
    fetchData(data[0].name);
  } catch (err) {
    renderError(err);
  }
};
// Fetching Data using fetch function
const fetchData = async (cityName) => {
  if (cityName !== "") {
    try {
      const response = await fetch(`${API_URL}${cityName}&appid=${API_KEY}&units=metric`);
      if (!response.ok) throw new Error("city couldn't find");
      const data = await response.json();
      displayData(data);
    } catch (err) {
      renderError(err);
    }
  }
};
//Defining data to be displayed on the basis of weather
const displayData = (data) => {
  const {weather: [{ main }],} = data;
  renderVisuals(main);
  renderWeatherDetails(data);
};

const renderVisuals = (mainWeather) => {
  switch (mainWeather) {
    case "Snow":
      snow();
      break;
    case "Rain":
      rain();
      break;
    case "Clear":
      clear();
      break;
    case "Smoke":
    case "Haze":
    case "Fog":
      smoke();
      break;
    default:
      clouds();
  }
};

const renderWeatherDetails = (data) => {
  const {
    name,
    sys: { country },
    coord: { lat, lon },
    main: { temp, feels_like, humidity },
    weather: [{ description }],
    wind: { speed },
    visibility,
  } = data;
  weatherUpadateContainer.innerHTML = null;
  weatherUpadateContainer.innerHTML = `<div class="location">
                <h1><i class="fas fa-street-view locationIcon"></i>
                    <label class="locationName">${name}, ${country}</label>
                </h1>
                <p class="longLat">Lat: ${lat} - Long: ${lon}</p>
            </div>
            <div class="temp">
                <h1 class="temperature">${Math.round(temp)}&deg;C</h1>
                <p class="tempStatus">${description}</p>
                <p class="feelsWind">
                    <label class="feelsLike">feels like : ${Math.trunc(feels_like)}&deg;C</label>
                    <label class="windSpeed">wind speed: ${speed}mps</label>
                </p>
                <p class="humvis">
                    <label class="humidity">humidity: ${humidity}%</label>
                    <label class="visibility">visibility: ${visibility / 1000}km</label>
                </p>
            </div>`;
};

//Defining Snow Condition
const snow = () => {
  hideElements("rgb(150, 150, 150)", "block", "block", "block");
  //Creating snowFlakes when they don't exist
    for (let i = 0; i <= 300; i++) {
      let snowFlakes = document.createElement("i");
      snowFlakes.className = "snowFlake";
      let x = Math.random() * window.innerWidth;
      let y = Math.floor(Math.random() * window.innerHeight - 200);
      let height = Math.random() * 10;
      let width = Math.random() * 10;
      let duration = Math.floor(Math.random() * 7) + 2;
      snowFlakes.style.height = height + "px";
      snowFlakes.style.width = width + "px";
      snowFlakes.style.top = y + "px";
      snowFlakes.style.left = x + "px";
      snowFlakes.style.animationDuration = duration + "s";
      visuals.appendChild(snowFlakes);
    }
};
//Defining Rain Conditon
const rain = () => {
  hideElements("rgb(150, 150, 150)", "block", "block", "block");
  visuals.className = "rain";
};

//Defining Clouds Condition
const clouds = () => {
  hideElements("#77b5fe", "block", "block", "block");
};

//Defining Smoke Condition
const smoke = () => {
  hideElements("linear-gradient(#77b5fe,#eee)", "block", "none", "none");
};

// Defining Clear Condition when the weather is Clear
const clear = () => {
  hideElements("#77b5fe", "block", "none", "none");
};

const renderError = (err) => {
  mainHeading.style.display = "block";
  weatherUpadateContainer.innerHTML = "";
  mainHeading.innerHTML = `<label style = "color: #f33">Oops! city not found</label>`;
};

const hideElements = (color, showCloud1, showCloud2, showCloud3) => {
  mainHeading.style.display = "none";
  weatherCondition.style.background = color;
  visuals.innerHTML = null;
  visuals.classList.remove("rain");
  cloud1.style.display = showCloud1;
  cloud2.style.display = showCloud2;
  cloud3.style.display = showCloud3;
};


//loads data when the user press the enter key
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") renderData(input.value);
});

// Loads data when the user clicks the search button
btn.addEventListener("click", () => {
  renderData(input.value);
});

const renderData = (searchText) => {
  if (!searchText) {
    emptyInput.className = "emptyInput showEmptyMessage";
    setTimeout(() => {
      emptyInput.className = "emptyInput";
    }, 2000);
  } else fetchData(searchText);
};
