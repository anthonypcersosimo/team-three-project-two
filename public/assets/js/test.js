$(document).ready(function () {

    const newCards = [
        {
            deck_name: "basic",
            term: "test",
            def: "test def"
        },
        {
            deck_name: "basic",
            term: "test",
            def: "test def"
        },
        {
            deck_name: "basic",
            term: "test",
            def: "test def"
        },
        {
            deck_name: "not basic",
            term: "test",
            def: "test def"
        },
        {
            deck_name: "not basic",
            term: "test",
            def: "test def"
        },
        {
            deck_name: "not basic",
            term: "test",
            def: "test def"
        },
        {
            deck_name: "not basic",
            term: "test",
            def: "test def"
        },
    ];

    const newDecks = [
        {
            deck_name: "basic"
        },
        {
            deck_name: "not basic"
        }
    ];

    function submitCard(Flashcard) {
        $.post("/api/flashcards/", Flashcard, function () {
            
        });
    };

    function submitDeck(Deck) {
        $.post("/api/decks", Deck, function () {

        })
    }
    newDecks.forEach(deck => submitDeck(deck))
    newCards.forEach(card => submitCard(card))
})