require("dotenv").config();

var command = process.argv[2]

var request = require("request");

var moment = require('moment');

var keys = require("./keys");

var Spotify = require('node-spotify-api');

var fs = require("fs");

var random = "random.txt"




// * `concert-this`
function concertInfo() {

    var artist = process.argv.slice(3).join(" ");

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("==============");
            console.log("Name of Venue: " + JSON.parse(body)[0].venue.name);
            console.log("Location: " + JSON.parse(body)[0].venue.city);
            console.log("Date of Event: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
            console.log("==============");
        }
    });


}
// * `spotify-this-song`

function getSong() {


    var song = process.argv.slice(3).join(" ");

    var spotify = new Spotify(keys.spotify);

    spotify
        .search({
            type: "track",
            query: song,
            limit: 5
        })
        .then(function (data) {
            for (i = 0; i < data.tracks.items.length; i++) {
                console.log("Artist(s): " + data.tracks.items[i].album.artists[0].name);
                console.log("Track: " + data.tracks.items[i].name);
                console.log("Preview Song: " + data.tracks.items[i].preview_url);
                console.log("Album: " + data.tracks.items[i].album.name);
                console.log("=============");
            }
        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

}

// * `movie-this`

function getMovie() {

    var movieName = process.argv[3];

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("==============");
            console.log("Title " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
            console.log("Country of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("==============");
        } else {
            // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
            console.log("==============");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
            console.log("It's on Netflix!");
            console.log("==============");
        }
    });


}

// * `do-what-it-says`

function doWhatItSays(){

    fs.readFile(random, "utf8",  (error, data) => {
        if  (error) throw error 
       
        let splitData = data.split(",");

        splitData.forEach((item) =>{
           
            console.log(item)
        })
        
    })
    }


switch (command) {
    case ("concert-this"):
        concertInfo()
        break
    case ("spotify-this-song"):
        getSong()
        break
    case ("movie-this"):
        getMovie()
        break
    case ("do-what-it-says"):
        doWhatItSays()
        break
}