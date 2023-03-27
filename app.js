//Weather Box
const apiKey = "10a30559fa1b44b0bc99f7fc2ab54f43";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const erorrText = document.querySelector(".error-txt");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const details = document.querySelector(".details");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.createElement("div");
document.querySelector(".weather.box").appendChild(loader);

onload = function () {
  if (localStorage.getItem("city") == null) {
    erorrText.style.visibility = "visible";
  } else {
    loader.className = "loader";
    checkWeather(localStorage.getItem("city"));
  }
};

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    loader.classList.remove("loader");
    details.style.visibility = "hidden";
    erorrText.innerHTML = "City Not Found, Please Enter a Valid City Name";
    erorrText.style.visibility = "visible";
  }
  var data = await response.json();
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
  weatherIcon.src = `./images/${data.weather[0].main}.png`;
  erorrText.style.visibility = "hidden";
  loader.classList.remove("loader");
  details.style.visibility = "visible";
}

searchBtn.addEventListener("click", function () {
  if (searchBox.value != "") {
    checkWeather(searchBox.value);
    localStorage.setItem("city", searchBox.value);
  }
});
