require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function whatCommand(search, term) {
  switch (search) {
    case "concert-this":
      getBand();
      break;
    case "spotify-this-song":
      spotifyMe();
      break;
    case "movie-this":
      movieMe();
      break;
    case "do-what-it-says":
      doIt(term);
      break;
    default:
      console.log(
        "Hello, It's me... I've been dreaming of an input to be... Please input 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says'."
      );
      break;
  }
}
//Title casing the titles with this function
String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

whatCommand(search, term);

// bandsInTown Code
function getBand() {
  if (!term) {
    term = "Rebelution";
  }
  console.log("---- Searching for the next available show ----");
  var artist = term;
  var URL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios
    .get(URL)
    .then(function(response) {
      var divider = "\n------------------------------------------------\n\n";
      //All variables working
      var jsonData = response.data[0];
      var venue = jsonData.venue.name;
      var country = jsonData.venue.country;
      var state = jsonData.venue.region;
      var city = jsonData.venue.city;
      var dateTime = moment(jsonData.datetime).format("MMMM Do YYYY, h:mm a");

      console.log(
        divider +
          "          My Band        \n\n" +
          "Artist of choice: " +
          artist.toProperCase() +
          "\n" +
          "Venue: " +
          venue +
          "\n" +
          "Country: " +
          country +
          "\n" +
          "State: " +
          state +
          "\n" +
          "City: " +
          city +
          "\n" +
          "Date/Time: " +
          dateTime +
          "\n" +
          divider
      );
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

// Spotify Code
function spotifyMe() {
  if (!term) {
    term = "crocodile rock elton john";
  }
  spotify.search({ type: "track", query: term, limit: 1 }, function(
    error,
    response
  ) {
    if (error) throw error;
    var song = term;
    var divider = "\n------------------------------------------------\n\n";
    var spotifyArr = response.tracks.items;
    for (i = 0; i < spotifyArr.length; i++) {
      console.log(
        divider +
          "          My Song        \n\n" +
          "Song of choice: " +
          response.tracks.items[i].name +
          "\n" +
          "Artist: " +
          response.tracks.items[i].album.artists[0].name +
          "\n" +
          "Album: " +
          response.tracks.items[i].album.name +
          "\n" +
          "Spotify Preview: " +
          response.tracks.items[i].preview_url +
          "\n" +
          "Spotify Link: " +
          response.tracks.items[i].external_urls.spotify +
          "\n" +
          divider
      );
    }
  });
}

// OMDB Code
function movieMe() {
  if (!term) {
    term = "remember the titans";
  }
  axios
    .get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
      var divider = "\n------------------------------------------------\n\n";
      var jsonData = response.data;
      var movie = term;
      var year = jsonData.Year;
      var rating = jsonData.imdbRating;
      var rotRating = jsonData.Ratings[1].value;
      var country = jsonData.Country;
      var language = jsonData.Language;
      var plot = jsonData.Plot;
      var actors = jsonData.Actors;
      console.log(
        divider +
          "          My Movie        \n\n" +
          "Movie of choice: " +
          movie.toProperCase() +
          "\n" +
          "Year movie came out: " +
          year +
          "\n" +
          "IMDB critics gave it: " +
          rating +
          "\n" +
          "Rotten Tomatoes critics rated it: " +
          rotRating +
          "\n" +
          "Country it was produced in: " +
          country +
          "\n" +
          "Language the movie is in: " +
          language +
          "\n" +
          "Plot of the movie: " +
          plot +
          "\n" +
          "Actors in the movie: " +
          actors +
          "\n" +
          divider
      );
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function doIt() {
  fs.readFile("random.txt", "UTF-8", function(error, response) {
    if (error) throw error;
    var dataArr = response.split(",");
    search = dataArr[0];
    term = dataArr[1];
    whatCommand(search, term);
  });
}