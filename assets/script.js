
      // Function to handle Music button click
document.getElementById('musicButton').addEventListener('click', function () {
    console.log("Music button clicked");
    currentSearchType = 'music';
    displayMusicSearchPrompt();
});
// Function to handle Movies button click
document.getElementById('moviesButton').addEventListener('click', function () {
    console.log("Movies button clicked");
    currentSearchType = 'movies';
});
// Function to display a prompt for music search
function displayMusicSearchPrompt() {
    console.log("Displaying music search prompt");
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    let promptContainer = document.createElement('div');
    promptContainer.classList.add('notification', 'is-primary');
    promptContainer.textContent = "Enter an artist, song title, or album in the search bar to find music.";
    resultsContainer.appendChild(promptContainer);
    resultsContainer.classList.remove('is-hidden');
}
// Event listener for form submission
document.querySelector('#userform').addEventListener('submit', function (e) {
    e.preventDefault();
    let searchTerm = document.getElementById('input').value;
    console.log("Form submitted with search term:", searchTerm);
    searchContent(searchTerm);
});
// Function to search content
function searchContent(term) {
    console.log("Searching content for term:", term);
    if (currentSearchType === 'music') {
        searchMusicWithShazam(term);
    } else {
    }
}
// Function to search music using Shazam API
function searchMusicWithShazam(query) {
    console.log("Searching music with Shazam for query:", query);
    const url = 'https://shazam.p.rapidapi.com/search?term=' + encodeURIComponent(query) + '&locale=en-US&offset=0&limit=5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e5e9bbadbmsh659c4ae30238e3bp18865bjsndf6715eb8d15',
            'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
    };
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log("Received data from Shazam:", data);
            displayMusicResults(data);
        })
        .catch(error => console.error('Error:', error));
}
// Function to display music search results from Shazam
function displayMusicResults(dataObj) {
    console.log("Displaying music results", dataObj);
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    dataObj.tracks.hits.forEach(hit => {
        var resultCard = document.createElement('div');
        resultCard.style.background = "rgb(113, 230, 191)";
        resultCard.classList.add('card', 'mb-3');
        var resultBody = document.createElement('div');
        resultBody.classList.add('card-content');
        resultCard.appendChild(resultBody);
        var titleEl = document.createElement('h3');
        titleEl.classList.add('title', 'is-4');
        titleEl.textContent = hit.track.title;
        resultBody.appendChild(titleEl);
        var subtitleEl = document.createElement('h4');
        subtitleEl.classList.add('subtitle', 'is-6');
        subtitleEl.textContent = 'by ' + hit.track.subtitle;
        resultBody.appendChild(subtitleEl);
        // Add to Favorites Button
        var addToFavoritesBtn = document.createElement('button');
        addToFavoritesBtn.style.float = "right";
        addToFavoritesBtn.textContent = 'Add to Favorites';
        addToFavoritesBtn.onclick = function() { addToFavorites(hit.track); };
        resultBody.appendChild(addToFavoritesBtn);
        resultsContainer.appendChild(resultCard);
    });
    resultsContainer.classList.remove('is-hidden');
}
// Function to add a track to favorites in local storage
function addToFavorites(track) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(track);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log("Added to favorites:", track);
}
// Variable to keep track of the current search type (Music or Movies)
let currentSearchType = '';


















