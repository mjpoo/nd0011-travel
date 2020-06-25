const capstone = localStorage;
let hist;
let dateDiff = 0;
let shortDate;
let shortEndDate;
let longEndDate;
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const datepicker = require('js-datepicker');

const picker = datepicker('#datePicker', {
    onSelect: (instance, d) => {
        console.log(d);
        capstone.longDate = d;

        

        dateDiff = Math.floor((d - Date.now()) / (1000*60*60*24));
        console.log(dateDiff);

        (dateDiff < -1 || dateDiff > 16) ? hist = true: hist = false;
        console.log(hist);

        capstone.monthId = d.getMonth();
        capstone.dateId = d.getDate();

        (dateDiff > 16) ? shortDate = 2019 : shortDate = d.getFullYear();                // So it gets the date from historical year for historical records
        shortDate = shortDate + '-' + (d.getMonth() + 1) + '-' + d.getDate();

        console.log(shortDate);
        capstone.date = shortDate;
        getWeather();
    }
});

function getWeather() {
    console.log('Will get the weather...', capstone.lat, capstone.lon);

    if(shortDate) {
        let startDate = new Date(capstone.longDate);
        console.log(startDate);

        // Create the end date by adding 24 hours
        const oneDay = 60 * 60 * 24 * 1000;
        const endDate = new Date(startDate.getTime() + oneDay);
        console.log(endDate);

        (dateDiff > 16) ? shortEndDate = 2019 : shortEndDate = startDate.getFullYear(); 
        shortEndDate = shortEndDate + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate();

        longEndDate = new Date(shortEndDate);

        console.log(shortEndDate);
    }

    fetch('http://localhost:8081/weather', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            lat: `${capstone.lat}`,
            lon: `${capstone.lon}`,
            startDate: `${capstone.date}`,
            endDate: `${shortEndDate}`,
            historical: hist
        })
    })
        .then(res => res.json())
        .then(function (res) {
            console.log(res)
            if(res.data){
                if(hist){
                    const wb = res.data[0];
                    console.log(wb);
                    document.getElementById('weatherImage').style.backgroundImage = `url("")`;
                    document.getElementById('weatherBlurb').innerHTML = `We can only tell you what the weather will be like in the next couple of weeks<br>but it might be helpful to know that the weather in ${capstone.location} (${capstone.country}) on ${capstone.dateId} of ${month[capstone.monthId]} ${longEndDate.getFullYear()} was:`;
                    document.getElementById('rainBlurb').innerHTML = (wb.precip > 0) ? `There was <strong>${Math.floor(wb.precip)}mm of rain</strong>.`: `It did not rain.`;
                    document.getElementById('temperatureBlurb').innerHTML = `The temperature was a low of <strong>${wb.min_temp}&deg;C</strong> and a high of <strong>${wb.max_temp}&deg;C</strong>.`;
                } else {
                    const wb = res.data[dateDiff + 1];
                    console.log(wb);
                    document.getElementById('weatherImage').style.backgroundImage = `url("https://www.weatherbit.io/static/img/icons/${wb.weather.icon}.png")`;
                    document.getElementById('weatherBlurb').innerHTML = `The forecast for ${capstone.location} (${capstone.country}) on ${capstone.dateId} of ${month[capstone.monthId]} is for <strong>${wb.weather.description.toLowerCase()}</strong>.`;
                    document.getElementById('rainBlurb').innerHTML = (wb.precip > 0) ? `There is a <strong>${Math.floor(wb.precip)}&percnt; chance of rain</strong>.` : 'It is not forecast to rain.';
                    document.getElementById('temperatureBlurb').innerHTML = `It will be <strong>${Math.floor(wb.temp)}&deg;C</strong>.`;
                    // document.getElementById('sunBlurb').innerHTML = `The sun will rise at <strong>${wb.sunrise} GMT</strong> and set at <strong>${wb.sunset} GMT</strong>.`;
                }

                document.getElementById("results").style.visibility = 'visible';
            }
        })
}

export { getWeather }
