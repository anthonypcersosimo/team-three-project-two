const routes = require('express').Router();
const path = require('path');

// Temp JSON response for connection testing
// const tempData = {
//     name: 'kyle',
//     occupation: 'crushing Js'
// }

// Temp route to test out the connection and the heroku deploy
// routes.get("/data", (req, res) => {
//     res.status(200).json(tempData);
// });

// This is the default route that will confirm connection
routes.get("/", (req, res) => {
    res.status(200).json({ message: "connected!" });
});

// For the two declarations below, basically we are incrementing our way through the api routes in an organized way.  this will allow us to set routes like ".....api/flashcards/add" to add a flashcard, but also "..../api/users/all" to get all users, without having them all mashed into a massive file.  It will also lend itself to a better understanding of how the requests and data will flow back and forth once things get complicated.

// Here we set the route trunk where all the flashcard routes will branch from
const flashcards = require('./flashcards');
routes.use('/api/flashcards', flashcards);

// Here we set the route trunk where all the users routes will branch from
const users = require('./users');
routes.use('/api/users', users);

// Export them to the server file to use.
module.exports = routes;