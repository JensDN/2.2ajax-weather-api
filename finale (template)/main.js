import {appKey} from "./js/token";
import {hideOutPut} from "./js/show-hide";

let setTemp = document.getElementById("set-temp");
document.querySelector('#searchFrom').addEventListener("submit", getWeather);

async function getWeather(e) {
    const city = document.querySelectr("#cityInput").value;
    const APIKEY = `7cc1ee386cd2f6106824b2347a6a0b17`;

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKEY}`;
    hideOutPut();

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            getWeatherToday(data);
            getWeatherWeek(data.name);
        })
        .catch(err => console.log(err));
    clearInput();
    e.preventDefault();
}

async  function getWeatherWeek(city) {
    const baseEndpoint =  `https://api.openweathermap.org/data/2.5/forecast`;
    const urlForecast = `${baseEndpoint}?q=${city}$APPID=${APIKEY}`;
    await fetch(urlForecast)
        .then(respons => respons.json())
        .then(data => setTemp.checked == false ? forecast(data) : forecastCelsius(data)
        );
    setInterval( function() {showOutPut();} , 500);
}
let icon = document.querySelector("#icon-div");


 function getWeatherToday(data) {
     icon.innerHTml = `
    <i class="icon ${selectIcon(data.weather[0].icon)}"/>
    <h2 class=""active" href="#" id="fahrenheit">
        ${fahrenheit(data.main.temp)}°F | 
          ${celsius(data.main.temp)}°C </h2>
    <br>
    <h3>
    Wind: ${data.wind.speed} mph
    <br>
    Humidity: ${data.main.humidity}%
    </h3>
    <br>
    `;


     let details = document.querySelector("#details-div");
     details.innerHTML = `
 <h2> ]{data.name}, ${data.sys.country} </h2>
 <br>
 <section>
    <h3>${getDateHour()}</h3>
    <h3>${cityCase(data.weather[0].description)}</h3>
</section>
 `;
 }