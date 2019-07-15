$(document).ready(function () {

    let deckId;
    let deckName;
    let lastCardId;
    let deck = [];

    $("#card-form").submit(event => handleCardSubmit(event))
    $("#deck-form").submit(event => handleDeckSubmit(event))

    const getCards = deckId => $.get("api/flashcards/deck/" + deckId, response => {
        deck = response;
        console.log(deck)
    })

    getCards(1)

    const submitDeck = deckName => $.post("/api/decks", deckName, response => deckId = response)

    const submitCard = flashcard => $.post("/api/flashcards/", flashcard, response => {
        lastCardId = response
        console.log(response)
    });

    const handleDeckSubmit = event => {
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
    }

    const handleCardSubmit = event => {
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
            .then(() => {
                if (lastCardId != 1) {
                    getCards(deckId).then(renderTable(deck))
                }
            }) 

    }

    const makeTableRow = card => {
        let id = card.id;
        let question = card.term;
        let answer = card.answer;

        let editButton = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("btn btn-warning m-1 p-1");
        editButton.data("id", id);

        let deleteButton = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("btn btn-danger m-1 p-1");
        deleteButton.data("id", id);


        let newRow = $("<tr>");
        newRow.data("id", id);

        newRow.append(`<th scope="row">${id}</th><td>${question}</td><td>${answer}</td><td>${buttons}</td>`);
        return newRow;
    }

    const renderTable = deck => {
        deck.forEach(card => {
           let newRow = makeTableRow(card);
           $("#card-rows").append(newRow);
        })
    }

})
