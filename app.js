const APIKEY = `7cc1ee386cd2f6106824b2347a6a0b17`;
const baseEndpoint =  `api.openweathermap.org`;
const forecast5Endpoint = `/data/2.5/forecast`;
let cityName ="Brussels";
let countryCode=""; // needs an , after cityname. Works without an countrycode
let cityID="";
let lat="";
let lon="";
let zipCode="";

const byCityNameEndpoint = `${baseEndpoint}${forecast5Endpoint}?q=${cityName}${countryCode}&APPID=${APIKEY}`;
const byCityIDEndPoint = `${baseEndpoint}${forecast5Endpoint}?id=${cityID}&APPID=${APIKEY}`;
const byGeographicCoordinatesEndpoint = `${baseEndpoint}${forecast5Endpoint}?lat=${lat}&Lon=${lon}&APPID=${APIKEY}`;
const byZIPCodeEndpoint = `${baseEndpoint}${forecast5Endpoint}?zip=${zipCode},${countryCode}&APPID=${APIKEY}`;

function handelError (err) {
    console.log("Oh No,");
    console.log(err);
}
async function fetchDataWeather (query, city, countryCode) {
    cityName = city;
    const res = await fetch(query);
    console.log(res);
    const data =  await res.json();
    console.log(data)
}
fetchDataWeather(byCityNameEndpoint, "London");
