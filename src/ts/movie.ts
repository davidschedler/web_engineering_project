let curentPage = 1;
let totalPages = 0;
let currentSearchTerm = "";
let favoriteMovies = [];


class Movie {
    title: string;
    poster: string;
    constructor(title, poster) {
        this.title = title;
        this.poster = poster;
    }
}

function searchMovie() {
    let searchMovie = (<HTMLInputElement>document.getElementById("SearchField"))?.value;
    searchMovie = searchMovie.split(" ").join("+")

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
                galleryItemFavorite.onclick = function() {
                    let myButton = <HTMLInputElement>document.getElementById("favButton");
                    let number = (<HTMLInputElement>document.getElementById("favButton"))?.innerText;
                    let convertedNumber = parseInt(number);
                    convertedNumber++;
                    document.getElementById("favButton").innerText = convertedNumber.toString();
                    console.log(myButton)
                    console.log(number)
                }

                galleryItem.appendChild(galleryItemImg);
                galleryItem.appendChild(galleryItemTitle);
                galleryItem.appendChild(galleryItemFavorite);

                let galleryFrame = document.getElementsByClassName("gallery-grid")[count].appendChild(galleryItem);
                count++;
            }
            totalPages = myJson.totalResults;
            let noResultsItem = (<HTMLInputElement>document.getElementById("galleryPage")).textContent = "Page " + curentPage + " of " + totalPages;

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
        let noResultsItem = (<HTMLInputElement>document.getElementById("noResults")).textContent = "";
        return true;
    } else {
        let noResultsItem = (<HTMLInputElement>document.getElementById("noResults")).textContent = "No reults found";
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
      // do nothing
    }
}

function decreasePage() {
    if (curentPage > 1) {
        curentPage--;
        searchMovie();
    }
    else {
      // do nothing
    }
}