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
}

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

