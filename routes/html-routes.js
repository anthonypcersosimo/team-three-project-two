// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/display", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/displayDecks.html"));
  });
  
  app.get("/card", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/currentCard/card.html"));
  });
  
  app.get("/form", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addDeck.html"));
  });

};
