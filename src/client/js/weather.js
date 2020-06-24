const capstone = localStorage;

function getWeather() {
    console.log('Will get the weather...', capstone.lat, capstone.lon);

    fetch('http://localhost:8081/weather', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lat: `${capstone.lat}`, lon: `${capstone.lon}`})
    })
    .then(res => res.json())
    .then(function(res) {
        const wb = res.data[0];
        // console.log(wb);
        document.getElementById('weatherTitle').innerHTML = wb.weather.description;
        document.getElementById('weatherBlurb').innerHTML = `The forecast is for <strong>${wb.weather.description.toLowerCase()}</strong>.<br><br>It will be <strong>${wb.temp}&deg;C</strong> with a <strong>${wb.precip}&percnt; chance of rain</strong>.`;
        document.getElementById('sunBlurb').innerHTML = `The sun will rise at <strong>${wb.sunrise} GMT</strong><br>and set at <strong>${wb.sunset} GMT</strong>.`;
        document.getElementById('weatherTile').style.backgroundImage = `url("https://www.weatherbit.io/static/img/icons/${wb.weather.icon}.png")`;
        document.getElementById("weatherTile").style.backgroundSize = "200px 200px";
    })
}

export { getWeather }
