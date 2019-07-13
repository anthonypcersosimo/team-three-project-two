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

    function submitCard(Flashcard) {
        $.post("/api/flashcards/", Flashcard, function () {
            
        });
    };

    newCards.forEach(card => submitCard(card))
})