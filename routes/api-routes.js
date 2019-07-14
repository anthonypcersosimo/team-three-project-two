var db = require("../models");

module.exports = function (app) {

    // GET route for getting all of the flashcards
    app.get("/api/flashcards/", function (req, res) {
        db.Flashcard.findAll({})
            .then(function (dbFlashcard) {
                res.json(dbFlashcard);
            });
    });

    // POST route for saving a new flashcard
    app.post("/api/flashcards", function (req, res) {
        console.log(req.body);
        db.Flashcard.create({
            deck_name: req.body.deck_name,
            term: req.body.term,
            def: req.body.def,
            DeckId: req.body.DeckId
        })
            .then(function (dbFlashcard) {
                res.json(dbFlashcard);
            });
    });

    // GET route for getting all of the decks
    app.get("/api/decks", function (req, res) {
        db.Deck.findAll({})
            .then(function (dbDeck) {
                res.json(dbDeck);
            });
    });

    // POST route for saving a new deck
    app.post("/api/decks", function (req, res) {
        // console.log(req.body);
        db.Deck.create({
            deck_name: req.body.deck_name,
        })
            .then(function (dbDeck) {
                res.json(dbDeck.id);
            });
    });

    // Get route for returning all cards for a specific deck
    app.get("/api/decks/:deckId", function (req, res) {
        db.Flashcard.findAll({
            where: {
                deckId: req.params.deckId
            }
        })
            .then(function (dbDeck) {
                res.json(dbDeck);
                // res.send({dbDeck})
            });
    });
}

