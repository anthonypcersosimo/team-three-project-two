var db = require("../models");

module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/flashcards/", function (req, res) {
        db.Flashcard.findAll({})
            .then(function (dbFlashcard) {
                res.json(dbFlashcard);
            });
    });

}