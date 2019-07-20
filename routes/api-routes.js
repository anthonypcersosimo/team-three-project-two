var db = require("../models");

module.exports = app => {

    // GET route for getting all of the flashcards
    app.get("/api/flashcards/", (req, res) => {
        db.Flashcard.findAll({
            where: {},
            include: [db.Deck]
        })
            .then(dbFlashcard => res.json(dbFlashcard));
    });


    // POST route for saving a new flashcard
    app.post("/api/flashcards", (req, res) => {
        console.log(req.body);
        db.Flashcard.create({
            term: req.body.term,
            def: req.body.def,
            DeckId: req.body.DeckId
        })
            .then(dbFlashcard => res.json(dbFlashcard.id));
    });

    // Get route for returning all cards for a specific deck
    app.get("/api/flashcards/deck/:id", (req, res) => {
        db.Flashcard.findAll({where: {deckId: req.params.id},
            include: [db.Deck]
        })
            .then(dbDeck => res.json(dbDeck));
    });

    // PUT route for updating cards
    app.put("/api/flashcards", (req, res) => {
        db.Flashcard.update(req.body, {where: {id: req.body.id}})
            .then(dbFlashcard => res.json(dbFlashcard));
    });

    // DELETE route for deleting cards
    app.delete("/api/flashcards/:id", (req, res) => {
        db.Flashcard.destroy({where: {id: req.params.id}})
        .then(dbFlashcard => res.json(dbFlashcard));
    });

    // GET route for getting all of the decks
    app.get("/api/decks", (req, res) => {
        db.Deck.findAll({
            where: {},
            include: [db.Flashcard]
        })
            .then(dbDeck => res.json(dbDeck));
    });

    // GET route for getting all decks by category
    app.get("/api/decks/:category", (req, res) => {
        db.Deck.findAll({
            where: {
                category: req.params.category
            },
            include: [db.Flashcard]
        }).then(dbDecks => res.json(dbDecks))
    })

    // POST route for saving a new deck
    app.post("/api/decks", (req, res) => {
        db.Deck.create({
            deck_name: req.body.deck_name,
            category: req.body.category
        })
            .then(dbDeck => res.json(dbDeck.id));
    });

    // DELETE route for deleting decks
    app.delete("/api/decks/:id", (req, res) => {db.Deck.destroy({where: {id: req.params.id}})
    .then(dbDeck => res.json(dbDeck));
    });
};




