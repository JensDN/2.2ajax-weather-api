let setTemp = document.getElementById("set-temp");
document.querySelector('#searchFrom').addEventListener("submit", getWeather);
const city = document.querySelectr("#cityInput").value;
const APIKEY = `7cc1ee386cd2f6106824b2347a6a0b17`;

async function getWeather(e) {
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
function cityCase(str) {
    return str
        .split(" ")
        .map(word => word[0].toUpperCase() + word.substring(1))
        .join(" ");
}
function getWeatherToday(data) {
    let icon = document.querySelector("#icon-div");
     icon.innerHTML = `
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
function clearInput() {
    document.getElementById("searchForm").reset();
}
function getDateHour() {
    let now = new Date();
    let nameDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    function getMinutes(time) {
        // This is to have always a zero.
        return ("0" + time.getMinutes()).slice(-2);
    }
    return `${nameDay[now.getDay()]}${now.getHours()}:${getMinutes(now)}`;
}
function celsius(tempKelvin) {
    return Math.round( tempKelvin - 273.15)
}
function fahrenheit(tempKelvin) {
    return Math.round((tempKelvin -283.15) * 1.8 +32);
}
// faracast-fahrenheit.js daar zit ik nu