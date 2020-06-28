import { getPhoto } from "./photo";
import { getWeather } from "./weather";

const capstone = localStorage;      // Notice the use of Local Storage for persistance (i.e. the additional customisation required by rubric)

function getLocation() {
    fetch('http://localhost:8081/geo', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({location: `${capstone.location}`})
    })
    .then(
        res => res.json()
    )
    .then(function(res) {
        capstone.location = res.name;
        capstone.country = res.countryName;

        // capstone.lat = res.lat;
        // capstone.lon = res.lng;        
        capstone.setItem('coords', JSON.stringify({lat: res.lat, lon: res.lng}));       // Storing the latitude and longitude in an object to satisfy the rubric

        // Now that we know the location we can get the weather and photos
        getWeather();
        getPhoto();
    })
}

// When they first come to the page prepopulate the previous location
if (!document.getElementById('location').value) {
    if(capstone.location){
        document.getElementById('intro').value = 'Welcome back! Do you still want to go to ${capstone.location}?';
        document.getElementById('location').value = capstone.location;
        getLocation();
    }
};

// and listen to the form once the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#searchForm").addEventListener('submit', (event) => {
        capstone.location = document.getElementById('location').value;
        event.preventDefault();
        getLocation();
    });
});

export { getLocation }
