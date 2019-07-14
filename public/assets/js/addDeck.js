$(document).ready(function () {
    let deckId;
    let deckName;
    let decks;

    // setDecksMenu();

    const setDecksMenu = () => {
        $.get('/api/decks', data => {
            data.forEach(deck => {
                let button = $(`<button type="button" class="dropdown-item">`);
                button.attr("data-deck", deck);
                button.text(deck.deck_name);
                $("#deck-menu").append(button)
            })
        })
    }

    setDecksMenu();
    
    const submitDeck = deck => $.post("/api/decks", deck, function (response) {
        deckId = response
        console.log(deckId)
    })

    const submitCard = Flashcard => $.post("/api/flashcards/", Flashcard);

    $("#complete").click((event) => {
        event.preventDefault();
        setDecksMenu();
        $("#card-form").addClass("hidden");
        $("#button-container").removeClass("hidden");
    })

    $("#deck-form").submit(event => {
        event.preventDefault();
        deckName = $("#deck-name").val().trim();
        let deck = {
            deck_name: deckName
        }
        submitDeck(deck)
            .then($("#deck-form").trigger("reset"))
            .then($("#deck-form").addClass("hidden"))
            .then($("#card-form").removeClass("hidden"));
    })

    $("#card-form").submit(event => {
        event.preventDefault();
        let card = {
            deck_name: deckName,
            term: $("#question").val().trim(),
            def: $("#answer").val().trim(),
            DeckId: deckId
        }

        submitCard(card)
            .then($("#card-form").trigger("reset"))
    })

    $("#anotherDeck").click(event => {
        event.preventDefault();
        $("#button-container").addClass("hidden");
        $("#deck-form").removeClass("hidden")
    })
})