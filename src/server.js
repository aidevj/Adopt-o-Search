"use strict";

// built-in modules
var http = require('http');
var url = require('url');
var query = require('querystring');
var fs = require('fs');

var PETFINDER_KEY = "ac31ccff5e15ee67ccdba25941868c6e";
var PETFINDER_SECRET = "716e19f5f903dfe895302e5e148a2b56";

// Import module - PetFinder  Promise API Client
// https://www.npmjs.com/paclage/petfinder-promise
var petfinder = require('petfinder-promise')(PETFINDER_KEY,PETFINDER_SECRET);

var PETFINDER_KEY = "ac31ccff5e15ee67ccdba25941868c6e";

// Html file to serve
var index = fs.readFileSync(__dirname + "/../client/index.html");
var css = fs.readFileSync(__dirname + "/../client/css/style.css");
var map = fs.readFileSync(__dirname + "/../client/js/map.js");
var controlpanel = fs.readFileSync(__dirname + "/../client/js/controlpanel.js");
var dogsvg = fs.readFileSync(__dirname + "/../client/media/dog.svg");
var placeholder = fs.readFileSync(__dirname + "/../client/media/placeholder.png");

// Port
var port = process.env.PORT || 3000;

// Function to handle HTTP web requests
function onRequest(req, res) {
  var parsedUrl = url.parse(req.url);
  var params = query.parse(parsedUrl.query);
  
  //console.dir(parsedUrl.pathname);
  
  if(parsedUrl.pathname === "/animalSearch") {
    animalSearch(req, res, params);
  }
  else if (parsedUrl.pathname === "/js/map.js"){
    res.writeHead(200, { "Content-Type" : "application/javascript"} );
    res.write(map);
    res.end();
  }
  else if (parsedUrl.pathname === "/js/controlpanel.js"){
    res.writeHead(200, { "Content-Type" : "application/javascript"} );
    res.write(controlpanel);
    res.end();
  }
  else if (parsedUrl.pathname === "/css/style.css"){
    res.writeHead(200, { "Content-Type" : "text/css"} );
    res.write(css);
    res.end();
  }
  else if (parsedUrl.pathname === "/media/dog.svg") {
    res.writeHead(200, { "Content-Type" : "image/svg+xml"} );
    res.write(dogsvg);
    res.end();
  }
  else if (parsedUrl.pathname === "/media/placeholder.png") {
    res.writeHead(200, { "Content-Type" : "image/png"} );
    res.write(placeholder);
    res.end();
  }
  else {
    res.writeHead(200, { "Content-Type" : "text/html"} );
    res.write(index);
    res.end();
  }
}

function animalSearch(req, res, params) {
  var animals = {
    animal: params.animal,
    location: params.location
  };
  
  //console.dir(params);
  //console.dir(animals);
  //console.log(petfinder.breed.list(animals.animal));
  
  petfinder.pet.find(animals.location).then(function (response) {   
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(response));
    res.end();
  }).catch(function (err) {
    console.error(err);
    var responseMessage = {
      error: "Could not find"
    }
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify(responseMessage));
    res.end();
  }); 
}

// LISTENING FOR REQUESTS
http.createServer(onRequest).listen(port);
console.log("listening on port " + port);