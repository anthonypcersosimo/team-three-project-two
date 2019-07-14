var db = require("../models");

module.exports = function (app) {

    //---------------------------------------------------------//
    // Flashcard routes
    //---------------------------------------------------------//

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

    // Get route for returning all cards for a specific deck
    app.get("/api/decks/:id", function (req, res) {
        db.Flashcard.findAll({
            where: {
                deckId: req.params.id
            }
        })
            .then(function (dbDeck) {
                res.json(dbDeck);
            });
    });

    // PUT route for updating cards
    app.put("/api/flashcards", function (req, res) {
        db.Flashcard.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbFlashcard) {
                res.json(dbFlashcard);
            });
    });

    // DELETE route for deleting cards
    app.delete("/api/flashcards/:id", function (req, res) {
        db.Flashcard.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbFlashcard) {
            res.json(dbFlashcard);
        });
    });

    //---------------------------------------------------------//
    // Deck routes
    //---------------------------------------------------------//

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

    // DELETE route for deleting decks
    app.delete("/api/decks/:id", function (req, res) {
        db.Flashcard.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbFlashcard) {
            res.json(dbFlashcard);
        });
    });


};




