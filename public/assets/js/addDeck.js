$(document).ready(function () {
    let deckId;
    let deckName;

    const url = window.location.search;

    if (url.indexOf("?deck_id=") !== -1) {
        deckId = url.split('=')[1];
        // display of the deck form is hidden, table shown
        //make a getCards function to get called here with the deckId
        //make a cards table to display them w/ edit/delete button on the right side.
    } else {
        // display the deck form, table "form" hidden
    }

    const displayCardsTable = (id) => {
        // 
    }

    const submitDeck = deck => $.post("/api/decks", deck, function (response) {
        deckId = response
        console.log(deckId)
    })

    const submitCard = flashcard => $.post("/api/flashcards/", flashcard);

    $("#complete").click((event) => {
        event.preventDefault();
        let term = $("#question").val().trim();
        let def = $("#answer").val().trim();

        if (!term || !def) {
            return;
        } else {
            let card = {
                deck_name: deckName,
                term: term,
                def: def,
                DeckId: deckId
            }
            submitCard(card)
            .then($("#card-form").trigger("reset"))
            .then($("#card-form").addClass("hidden"))
            .then($("#deck-form").removeClass("hidden"));
        }
    })

    $("#deck-form").submit(event => {
        event.preventDefault();
        deckName = $("#deck-name").val().trim();
        if (!deckName) return;
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
        let term = $("#question").val().trim();
        let def = $("#answer").val().trim();

        if (!term || !def) return;

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