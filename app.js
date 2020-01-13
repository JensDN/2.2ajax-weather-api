
const APIKEY = `&appid=7cc1ee386cd2f6106824b2347a6a0b17`;
const baseEndpoint =  `https://api.openweathermap.org/data/2.5/forecast`;
const input = document.querySelector('#input');
const form = document.querySelector('form');
const weatherOutput = document.querySelector('#resultaten');
const language = 'nl';
function handelError (err) {
    console.log("Oh No,");
    console.log(err);
}

async function fetchDataWeather (city) {
    const res = await fetch(`${baseEndpoint}?q=${city}${APIKEY}`);
    const data =  await res.json();
    console.log(data);
    return data;
}

function displayForecast(day, min, max) {
    return `
    <div class="flexEl">
      <p class="day">${day}</p>
      <ul class="temptable">
        <li>min: ${min}</li>
        <li>max: ${max}</li>
      </ul>
    </div>
  `
}

async function avgTempByDay(data) {
    const info = await data;
    const tempAvg = {};
    info.list.map(el => {
        const date = new Date(el.dt_txt.split(' ')[0]).toLocaleString(language, { weekday :"long", month: "long", day: "numeric"  });

        const minTemp = Math.floor((el.main.temp_min - 273) * 10) /10;
        const maxTemp = Math.floor((el.main.temp_max - 273) * 10) /10;
        if(!tempAvg[date]) {
            tempAvg[date] = {min: minTemp, max: maxTemp};
        }
        if(minTemp < tempAvg[date].min){
            tempAvg[date].min = minTemp;
        }
        if(maxTemp > tempAvg[date].max){
            tempAvg[date].max = maxTemp;
        }

    });

    console.log(tempAvg);
    return tempAvg;
}

async function handleClick(e) {
    e.preventDefault();
    const city = input.value;
    const obj = await avgTempByDay(fetchDataWeather(city));
    console.log(Object.entries(obj));
    let HTML = '';
    Object.entries(obj).map(el => {
        HTML += displayForecast(el[0], el[1].min, el[1].max);
    });

    weatherOutput.innerHTML = HTML;
}

form.addEventListener('submit', handleClick);

