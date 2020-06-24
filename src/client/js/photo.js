const capstone = localStorage;

function getPhoto() {
    fetch('http://localhost:8081/photo', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({location: `${capstone.location}`})
    })
    .then(res => res.json())
    .then(function(res) {
        if(res.total > 0) {
            document.getElementById('locationTile').style.backgroundImage = `url("${res.hits[0].webformatURL}")`;
        } else {
            document.getElementById('sunTile').style.backgroundImage = 'url("https://img.yachting.org/gallery/12/250/13885.jpg")';
        }

        if(res.total > 1) {
            document.getElementById('sunTile').style.backgroundImage = `url("${res.hits[1].webformatURL}")`;
        } else {
            document.getElementById('sunTile').style.backgroundImage = 'url("https://img.yachting.org/gallery/12/250/13885.jpg")';
        }
    })
}

export { getPhoto }
