$(document).ready(function () {

    $("#cards").on("click", function () {
        window.location.href = "/card";
    });
    $("#form").on("click", function () {
        window.location.href = "/form";
    });
    $("#decks").on("click", function () {
        window.location.href = "/display";
    });

    // const submitDeck = deckName => $.post("/api/decks", deckName, response => deckId = response)

    // const submitCard = flashcard => $.post("/api/flashcards/", flashcard, response => {
    //     lastCardId = response
    //     console.log(response)
    // });

    // const testDecks = [
    //     { deck_name: "test1" },
    //     { deck_name: "test2" },
    //     { deck_name: "test3" }
    // ];

    // const testCards = [
    //     {
    //         deck_name: "test1",
    //         term: "testa",
    //         def: "testa",
    //         DeckId: 1
    //     },
    //     {
    //         deck_name: "test1",
    //         term: "testa",
    //         def: "testa",
    //         DeckId: 1
    //     },
    //     {
    //         deck_name: "test1",
    //         term: "testa",
    //         def: "testa",
    //         DeckId: 1
    //     },
    //     {
    //         deck_name: "test2",
    //         term: "testb",
    //         def: "testb",
    //         DeckId: 2
    //     },
    //     {
    //         deck_name: "test2",
    //         term: "testb",
    //         def: "testb",
    //         DeckId: 2
    //     },
    //     {
    //         deck_name: "test2",
    //         term: "testb",
    //         def: "testb",
    //         DeckId: 2
    //     },
    //     {
    //         deck_name: "test3",
    //         term: "testc",
    //         def: "testc",
    //         DeckId: 3
    //     },
    //     {
    //         deck_name: "test3",
    //         term: "testc",
    //         def: "testc",
    //         DeckId: 3
    //     },
    //     {
    //         deck_name: "test3",
    //         term: "testc",
    //         def: "testc",
    //         DeckId: 3
    //     },
    // ]

    // testDecks.forEach(deck => submitDeck(deck))
    // testCards.forEach(card => submitCard(card))
    

})