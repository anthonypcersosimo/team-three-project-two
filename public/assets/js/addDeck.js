$(document).ready(function () {
    let deckId;
    let deckName;

    const setDecksMenu = () => {
        $.get('/api/decks', data => {
            data.forEach(deck => {
                // console.log(deck.id)
                // meed to prevent duplication

                let button = $(`<button type="button" class="dropdown-item">`);
                button.attr("data-id", deck.id);
                button.text(deck.deck_name);
                // console.log(button.attr("data-id"))
                $("#deck-menu").append(button)
            })

            // this was sooo weird, the click event assignment below wouldn't bind to $(this) when I was using an arrow function.  It was extremely frustrating because all the other events were triggering fine.  It took forever to randomly switch it to the "function () {}" syntax and see that it worked.
            $(".dropdown-item").on("click", function () {
                // console.log("click")
                let deckId = $(this).attr("data-id")
                console.log(deckId)
                $("#deck-form").trigger("reset");
                $("#deck-form").addClass("hidden");
                $("#card-form").removeClass("hidden");
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