let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let inputCity = document.querySelector(".weather_search");

// to weather Data function
const getDateTime = (dateTime) => {
  const curDate = new Date(dateTime * 1000);
  // console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const date = formatter.format(curDate);

  return date;
};

// to get Country code to Country Name function
const getCountryName = (countryCode) => {
  const regionNamesInEnglish = new Intl.DisplayNames([countryCode], {
    type: "region",
  });

  return regionNamesInEnglish.of(countryCode);
};

// by default city
let city = "Kamrej";

// get input city
inputCity.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputCityName = document.querySelector(".city_name");
  console.log(inputCityName.value);
  city = inputCityName.value;
  getWeatherData();
  inputCityName.value = "";
});

// getWeatherData() function define
const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d61f18dc914dc6e750017ff64ad7d226
`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    // display city & country
    cityName.innerHTML = `${name},${getCountryName(sys.country)}`;

    // display date , time & month
    dateTime.innerHTML = getDateTime(dt);

    // display weather_forecast
    w_forecast.innerHTML = weather[0].main;

    // display weather_icon
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;

    // display temperature
    let kelvin = main.temp;
    let celsius = 273.15;
    let kelvinToCelsius = kelvin - celsius;
    w_temperature.innerHTML = `${kelvinToCelsius.toFixed(2)}&#176C
`;
    // min temperature
    let minKelvin = main.temp_min;
    let minKelvinToCelsius = minKelvin - celsius;
    // console.log(minKelvinToCelsius);
    w_minTem.innerHTML = `Min : ${Math.floor(minKelvinToCelsius)}&#176C`;

    // max temperature
    let maxKelvin = main.temp_max;
    let maxKelvinToCelsius = maxKelvin - celsius;
    // console.log(maxKelvinToCelsius);
    w_maxTem.innerHTML = `Max : ${Math.ceil(maxKelvinToCelsius)}&#176C`;

    // get weather_feelsLike data
    let feelLike = main.feels_like;
    let feelLikeTocelsius = feelLike - celsius;
    w_feelsLike.innerHTML = `${Math.round(feelLikeTocelsius)}&#176C`;

    // get weather_humidity data
    w_humidity.innerHTML = `${main.humidity}%`;

    // get weather_wind data
    w_wind.innerHTML = `${wind.speed} m/s`;

    // get weather_pressure data
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};
// page load data autometic show
document.body.addEventListener("load", getWeatherData());
