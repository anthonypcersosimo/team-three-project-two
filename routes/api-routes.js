var db = require("../models");

module.exports = function (app) {

    //---------------------------------------------------------//
    // Flashcard routes
    //---------------------------------------------------------//

    // GET route for getting all of the flashcards
    // Joined on deck by DeckId
    // Tested working
    app.get("/api/flashcards/", function (req, res) {
        db.Flashcard.findAll({
            where: {},
            include: [db.Deck]
        })
            .then(function (dbFlashcard) {
                res.json(dbFlashcard);
            });
    });


    // POST route for saving a new flashcard
    // Tested working
    app.post("/api/flashcards", function (req, res) {
        console.log(req.body);
        db.Flashcard.create({
            // deck_name: req.body.deck_name,
            term: req.body.term,
            def: req.body.def,
            DeckId: req.body.DeckId
        })
            .then(function (dbFlashcard) {
                res.json(dbFlashcard.id);
            });
    });

    // Get route for returning all cards for a specific deck
    // Joined with deck on DeckId
    // Tested working
    app.get("/api/flashcards/deck/:id", function (req, res) {
        db.Flashcard.findAll({
            where: {
                deckId: req.params.id
            },
            include: [db.Deck]
        })
            .then(function (dbDeck) {
                res.json(dbDeck);
            });
    });

    // PUT route for updating cards
    // Tested working
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
    // Tested working
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
    // Joined on flashcard
    // Tested working
    app.get("/api/decks", function (req, res) {
        db.Deck.findAll({
            where: {},
            include: [db.Flashcard]
        })
            .then(function (dbDeck) {
                res.json(dbDeck);
            });
    });

    // GET route for getting all decks by category
    // Tested working
    app.get("/api/decks/:category", (req, res) => {
        db.Deck.findAll({
            where: {
                category: req.params.category
            },
            include: [db.Flashcard]
        }).then(dbDecks => res.json(dbDecks))
    })

    // POST route for saving a new deck
    // Tested working
    app.post("/api/decks", function (req, res) {
        // console.log(req.body);
        db.Deck.create({
            deck_name: req.body.deck_name,
            category: req.body.category
        })
            .then(function (dbDeck) {
                res.json(dbDeck.id);
            });
    });

    // DELETE route for deleting decks
    //  Tested working
    app.delete("/api/decks/:id", function (req, res) {
        db.Deck.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbDeck) {
            res.json(dbDeck);
        });
    });

};




