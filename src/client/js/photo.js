const capstone = localStorage;
let photoData;
let photoID = 0;
var photoInterval = setInterval(updatePhotos, 7000);

function getPhoto() {
    fetch('http://localhost:8081/photo', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({location: `${capstone.location}`})
    })
    .then(res => res.json())
    .then(function(res) {
        photoData = res;    // Put the results into our own object
        updatePhotos();     // Initial one to kick it off
        photoInterval;      // Then the intervals
    })
}

function updatePhotos(){
    if(photoData){
        if(photoData.total > 0) {
            displayPhoto();
            (photoData.hits.length > photoID) ? photoID += 1 : photoID = 0;
        } else {
            document.querySelector('body').style.backgroundImage = `url("https://cdn.pixabay.com/photo/2018/05/17/16/03/compass-3408928_960_720.jpg")`;
        }
    }
}

function displayPhoto(){
    if(photoData.hits[photoID]){
        document.querySelector('body').style.backgroundImage = `url("${photoData.hits[photoID].webformatURL}")`; 
    }
}

export { getPhoto }
