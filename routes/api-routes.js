var db = require("../models");

module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/flashcards/", function (req, res) {
        db.Flashcard.findAll({})
            .then(function (dbFlashcard) {
                res.json(dbFlashcard);
            });
    });

    // POST route for saving a new post
    app.post("/api/flashcards", function (req, res) {
        console.log(req.body);
        db.Flashcard.create({
            deck_name: req.body.deck_name,
            term: req.body.term,
            def: req.body.def
        })
            .then(function (dbFlashcard) {
                res.json(dbFlashcard);
            });
    });
}