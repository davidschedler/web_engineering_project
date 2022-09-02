var curentPage = 1;
var totalPages = 0;
var currentSearchTerm = "";
var favoriteMovies = [];


class Movie {
    constructor(title, poster) {
        this.title = title;
        this.poster = poster;
    }
}

function addFavorite(movie) {
    favoriteMovies.push(movie);
    console.log(favoriteMovies);
}

function removeFavorite(movie) {
    favoriteMovies.splice(favoriteMovies.indexOf(movie), 1);
    console.log(favoriteMovies);
}

function searchMovie() {
    var searchMovie = document.getElementById("SearchField").value;
    searchMovie = searchMovie.replaceAll(" ", "+")

    if (currentSearchTerm != searchMovie) {
        currentSearchTerm = searchMovie;
        resetPages();
    }

    console.log(searchMovie);

    fetch("http://www.omdbapi.com/?s=" + searchMovie + "&page=" + curentPage + "&type=movie&apikey=51f33a33")
    .then(function (response) {        
        return response.json();
    })
    .then(function (myJson) {
        cleanGallery()
        if (hasResults(myJson)) {
            for (const movie of myJson.Search) {
                console.log(movie.Title);
                let count = 0;
                let galleryItem = document.createElement("figure");
                galleryItem.className = "gallery-frame";
                
                let galleryItemImg = document.createElement("img")
                galleryItemImg.src = movie.Poster;
                galleryItemImg.className = "gallery-img";
                
                let galleryItemTitle = document.createElement("figcaption");
                galleryItemTitle.textContent = movie.Title;

                let galleryItemFavorite = document.createElement("button");
                galleryItemFavorite.textContent = "Add to favorites";

                galleryItem.appendChild(galleryItemImg);
                galleryItem.appendChild(galleryItemTitle);
                galleryItem.appendChild(galleryItemFavorite);

                let galleryFrame = document.getElementsByClassName("gallery-grid")[count].appendChild(galleryItem);
                count++;
            }
            totalPages = myJson.totalResults;
            let noResultsItem = document.getElementById("galleryPage").textContent = "Page " + curentPage + " of " + totalPages;

            console.log(myJson);
        }
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });
}

function cleanGallery() {
    let galleryFrame = document.getElementsByClassName("gallery-grid")[0];
    while (galleryFrame.firstChild) {
        galleryFrame.removeChild(galleryFrame.firstChild);
    }
}

function resetPages() {
    curentPage = 1;
    totalPages = 0;
}

function hasResults(myJson) {
    if (myJson.Response) {
        let noResultsItem = document.getElementById("noResults").textContent = "";
        return true;
    } else {
        let noResultsItem = document.getElementById("noResults").textContent = "No reults found";
        return false;
    }
}

function increasePage() {
    console.log("increasePage");
    if (curentPage < totalPages) {
        curentPage++;
        searchMovie();
    }
    else {

    }
}

function decreasePage() {
    if (curentPage > 1) {
        curentPage--;
        searchMovie();
    }
    else {

    }
}