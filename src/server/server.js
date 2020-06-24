var path = require('path');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('dist'))                                     // Initialise the distribution folder

// THE ROUTES
app.get('/', function (req, res) {                                  // Displays the homepage in Prod mode
    // console.log('Loading prod homepage');
    res.sendFile('dist/index.html');
})

// app.post('/api', cors(), function (req, res) {                       // For the API calls
//     textapi.sentiment({
//         // 'url': 'https://www.yachting.org'
//         'url': req.body.articleUrl
//     }, function(error, response) {
//         res.send(response)
//     })
// })

app.listen(8081, function () {
    console.log('App listening on port 8081');
})
