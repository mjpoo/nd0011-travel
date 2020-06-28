import { getPhoto } from "./photo";
import { getWeather } from "./weather";

const capstone = localStorage;

console.log(capstone);

function getLocation() {
    // console.log('Location', capstone.location);

    fetch('http://localhost:8081/geo', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({location: `${capstone.location}`})
    })
    .then(
        // console.log(res)
        res => res.json()
    )
    .then(function(res) {
        console.log(res);
        capstone.location = res.name;
        capstone.country = res.countryName;
        capstone.lat = res.lat;
        capstone.lon = res.lng;

        // Now that we know the location we can get the weather and photos
        getWeather();
        getPhoto();
    })
}

// When they first come to the page prepopulate the previous location
if (!document.getElementById('location').value) {
    if(capstone.location){
        console.log('Welcome back!');
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
