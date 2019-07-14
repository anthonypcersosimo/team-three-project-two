$(document).ready(function() {

    const submitDeck = Deck => $.post("/api/decks", Deck)

    $("#deck-form").submit(event => {
        event.preventDefault();
        let deckName = $("#deck-name").val().trim();
        submitDeck(deckName).then(console.log(data));
    })
})