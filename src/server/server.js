var path = require('path');

const express = require('express');
const app = express();

const axios = require('axios');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

require('babel-polyfill');

app.use(express.static('dist'))                                     // Initialise the distribution folder

// THE ROUTES
app.get('/', function (req, res) {                                  // Displays the homepage in Prod mode
    // console.log('Loading prod homepage');
    res.sendFile('dist/index.html');
})

app.get('/testserver', function (req, res) {                        // Endpoint that Jest can use
    res.json({
        test: 'test passed',
    });
})

app.post('/geo', cors(), function (req, res) {
    // Use Geonames API
    // console.log('getting', req.body.location);

    axios.get('http://api.geonames.org/searchJSON', {
        params: {
            maxRows: 1,
            q: req.body.location,
            username: process.env.GEONAMES_USERNAME
        }
    }).then(resp => {
        // console.log(resp.data.geonames[0]);
        res.end(JSON.stringify(resp.data.geonames[0]));
        //   getWeather(lat, lon);
    })
        .catch(err => {
            // console.log(err);
            // console.log(err.response.status);
            res.end(JSON.stringify({ 'Error': err }));
        })
})

app.post('/photo', cors(), function (req, res) {
    // Use Pixabay API
    // console.log('Getting the photo from Pixabay');

    axios.get('https://pixabay.com/api/', {
        params: {
            q: req.body.location,
            image_type: 'photo',
            category: 'travel',
            key: process.env.PIXABAY_KEY
        }
    }).then(resp => {
        // console.log(resp.data);
        res.end(JSON.stringify(resp.data));
    })
        .catch(err => {
            // console.log(err);
            console.log(err.response.data);
            // console.log(err.response.status);
            res.end(JSON.stringify({ 'Error': err }));
        })
})

app.post('/weather', cors(), function (req, res) {
    // Use Weatherbit API
    // console.log('Getting the weather from Weatherbit');
    let url;
    // url = 'https://api.weatherbit.io/v2.0/current';

    if (req.body.historical) {
        console.log('Getting historical')

        url = `https://api.weatherbit.io/v2.0/history/daily`
    } else {
        console.log('Getting forecast');
        url = 'https://api.weatherbit.io/v2.0/forecast/daily'
    }

    axios.get(url, {
        params: {
            units: 'M',
            lat: req.body.lat,
            lon: req.body.lon,
            start_date: req.body.startDate,
            end_date: req.body.endDate,
            key: process.env.WEATHERBIT_KEY
        }
    }).then(resp => {
        // console.log(resp.data);
        res.end(JSON.stringify(resp.data));
    })
        .catch(err => {
            console.log(err);
            console.log(err.data.error);
            res.end(JSON.stringify({ 'Error': err }));
        })
})

app.listen(8081, function () {
    console.log('App listening on port 8081');
})

module.exports = app;       // Seems perverse that need to do this to fit the test suite