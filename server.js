const express = require('express');
const path = require('path');
const routes = require('./controllers/flashcards_controller')
// const routes = require('./routes')

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Grabs all of the routes from the "routes" folder
app.use(routes);

app.listen(PORT, function () {
    console.log("App now listening at localhost:" + PORT);
});