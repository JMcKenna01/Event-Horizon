// Function to handle Music button click
document.getElementById('musicButton').addEventListener('click', function () {
    loadContent('music');
});

// Function to handle Movies button click
document.getElementById('moviesButton').addEventListener('click', function () {
    loadContent('movies');
});

// Function to load content based on type (music or movies)
function loadContent(type) {
    // Here you would make a request towardsd Bulma-API
    fetch('/get-content?type=' + type)
        .then(response => response.text())
        .then(data => {
            document.getElementById('results').innerHTML = data;
            document.getElementById('results').classList.remove('is-hidden');
        })
        .catch(error => console.error('Error:', error));
}

// Function to add an event to favorites
function addToFavorites(eventId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(eventId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    // Update UI to reflect the change
}

// Event listener for form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    let searchTerm = document.getElementById('input').value;
    searchContent(searchTerm);
});

// Function to search content
function searchContent(term) {
    // Request to search for content
    fetch('/search?query=' + term)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Process and display the search results
            displaySearchResults(data);
        })
        .catch(error => console.error('Error:', error));
}


// Function to display search results
function displaySearchResults(results) {
    // Update the #results section with search results
    let resultsHtml = results.map(result => `<div>${result.title}</div>`).join('');
    document.getElementById('results').innerHTML = resultsHtml;
    document.getElementById('results').classList.remove('is-hidden');
}