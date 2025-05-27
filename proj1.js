const apiKey = "3c39ff71485ae5ebed96b50cdb01d10e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// DOM Elements
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

// Weather fetching function
async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Choose weather icon based on condition (preferably weather condition not just temperature)
    const condition = data.weather[0].main.toLowerCase();

    if (condition.includes("cloud")) {
      weatherIcon.src = "./images/clouds.png";
    } else if (condition.includes("rain")) {
      weatherIcon.src = "./images/rain.png";
    } else if (condition.includes("drizzle")) {
      weatherIcon.src = "./images/drizzle.png";
    } else if (condition.includes("mist") || condition.includes("fog")) {
      weatherIcon.src = "./images/mist.png";
    } else if (condition.includes("snow")) {
      weatherIcon.src = "./images/snow.png";
    } else {
      weatherIcon.src = "./images/clear.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Weather API error:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// Search button click
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
