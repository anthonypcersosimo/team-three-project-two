$(document).ready(function () {
    let deck;
    const getCards = deckId => $.get("/api/flashcards/deck/" + deckId, response => deck = response)
    getCards(1).then(() => console.log(deck));
    // $.get("/api/flashcards/deck/1", function(result) {
    //     console.log(result)
    // })
})