$(document).ready(function () {

    let deckId;
    let deckName;
    let deck = [];

    $("#card-form").submit(event => handleCardSubmit(event))
    $("#deck-form").submit(event => handleDeckSubmit(event))
    // $("#complete").click(event => handleCardSubmit(event)
    //     .then($("#card-form").addClass("hidden"))
    //     .then($("#deck-form").removeClass("hidden")))

    const getCards = deckId => $.get("api/flashcards/deck/" + deckId, response => {
        deck = response;
        console.log(deck)
    })
    const deleteCard = cardId => {
        $.ajax({
            method: "DELETE",
            url: "api/flashcards/" + cardId
        }).then(response => console.log(response))
            .then(() => getCards(deckId)
                .then(renderTable(deck)))
    }

    const submitDeck = deckName => $.post("/api/decks", deckName, response => deckId = response)

    const submitCard = flashcard => $.post("/api/flashcards/", flashcard, response => {
        lastCardId = response
        console.log(response)
    });

    const handleDeckSubmit = event => {
        event.preventDefault();
        console.log("deck submit")
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
        console.log("card submit")
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
            .then(() => getCards(deckId)
                .then(renderTable(deck)))
    }

    const makeTableRow = card => {
        let id = card.id;
        let question = card.term;
        let answer = card.def;

        let newRow = $("<tr>");
        newRow.data("id", id);

        // newRow.append(`<th scope="row">${id}</th><td>${question}</td><td>${answer}</td>`);

        newRow.append(`<th scope="row"><a style='cursor:pointer;'>${id}</a></td>`)
        newRow.append(`<td><a style='cursor:pointer;' class='edit-term'>${question}</a></td>`)
        newRow.append(`<td><a style='cursor:pointer;' class='edit-def'>${answer}</a></td>`)
        newRow.append(`<td class="delete-row"><a style='cursor:pointer;color:red' class='delete-card'>Delete</a></td>`)

        return newRow;
    }

    const renderTable = deck => {
        $("#card-rows").empty();
        deck.forEach(card => {
            let newRow = makeTableRow(card);
            $("#card-rows").append(newRow);
        })
    }

    $(document).on("click", ".delete-card", function () {
        console.log("click delete")
        let id = $(this).parent("td").parent("tr").data("id")
        console.log("delete ID: " + id)
        deleteCard(id)
        // .then(() => getCards(deckId)
        //     .then(renderTable(deck)))

    })
    $(document).on("click", ".edit-term", function () {
        console.log("click edit term")
        let id = $(this).parent("td").parent("tr").data("id")
        console.log("term ID: " + id)
        let placeholder = $(this).find("td").innerHTML
        // let placeholder = $(this).innerText
        console.log(placeholder)
        $(this).parent("td").html(`<form><input type="text" id="term-${id}" value="${placeholder}"></form>`)

    })
    $(document).on("click", ".edit-def", function () {
        console.log("click edit def")
        let id = $(this).parent("td").parent("tr").data("id")
        console.log("def ID: " + id)

    })


})
