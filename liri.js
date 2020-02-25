require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");
var axios = require("axios");
var momemt = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var input1 = process.argv[2];
var input2 = process.argv[3];

// var spotify = new Spotify(keys.spotify);

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

// creat the switch here
switch (input1) {
    case "concert-this":
        bandsInTown(input2)
        break;
    case "movie-this":
        movieSearch(input2)
        break;
}

// hit the bandsInTown api and return venue name venue city the event
function bandsInTown(artist) {
    // artist is equal the inpust2 which was passed in the switch

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function(response){
        console.log("Name of the venue:", response.data[0].venue.name);
        console.log("Venue location:", response.data[0].venue.city);
    })
    .catch(function (error) {
        console.log(error);
      });
}

// Title of the movie.
// Year the movie came out.
// IMDB Rating of the movie.
// Rotten Tomatoes Rating of the movie.
// Country where the movie was produced.
// Language of the movie.
// Plot of the movie.
// Actors in the movie.

function movieSearch(movie){
    axios.get("http://www.omdbapi.com/?apikey=a062b41f&t=" + movie)
    .then(function(data) {
        console.log("Title of the movie:", data.data.Title)
        console.log("Year the movie came out:", data.data.Year);
        console.log("IMDB Rating of the movie:", data.data.Ratings.Value);
        console.log("Rotten Tomatoes Rating of the movie:", data.data.Ratings[1].Value);
        console.log("Country where the movie was produced:", data.data.Country);
        console.log("Language of the movie:", data.data.Language);
        console.log("Plot of the movie:", data.data.Plot);
        console.log("Actors in the movie:", data.data.Actors);
    })
    .catch(function (error) {
        console.log(error);
    });
    if (movie === "Mr. Nobody") {
        console.log("Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!")
    }
}



