$(document).ready(function () {

    let deckId;
    let deckName;
    let deck = [];

    $("#card-form").submit(event => handleCardSubmit(event));
    $("#deck-form").submit(event => handleDeckSubmit(event));
    $("#complete").click(event => handleFinish(event));

    var url = window.location.search;

    const getCards = deckId => $.get("api/flashcards/deck/" + deckId, response => {
        deck = response;
        console.log("deck response", deck)
        renderTable(deck)
    });

    if (url.indexOf("?deck_id=") !== -1) {
        deckId = url.split("=")[1];
        console.log(deckId)
        $("#deck-form").addClass("hidden");
        getCards(deckId);
    }
    const deleteCard = cardId => {
        $.ajax({
            method: "DELETE",
            url: "api/flashcards/" + cardId
        }).then(response => console.log(response))
            .then(() => getCards(deckId)
                .then(renderTable(deck)))
    };

    const handleFinish = event => {
        event.preventDefault();
        let term = $("#question").val().trim();
        let def = $("#answer").val().trim();

        if (!term || !def) return;

        let card = {
            deck_name: deckName,
            term: $("#question").val().trim(),
            def: $("#answer").val().trim(),
            DeckId: deckId
        };

        submitCard(card)
            .then($("#card-form").trigger("reset"))
            .then(() => window.location.href = "/display");
    }

    const submitDeck = deckName => $.post("/api/decks", deckName, response => deckId = response);

    const submitCard = flashcard => $.post("/api/flashcards/", flashcard, response => lastCardId = response);

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
    };

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
        };

        submitCard(card)
            .then($("#card-form").trigger("reset"))
            .then(() => getCards(deckId));
    };

    const handleRowChange = (event, card) => {
        event.preventDefault();
        $.ajax({
            method: "PUT",
            url: "/api/flashcards",
            data: card
        }).then(response => console.log(response))
            .then(() => getCards(deckId)
                .then(renderTable(deck)))
    }

    const makeTableRow = (card, index) => {
        let id = card.id;
        let question = card.term;
        let answer = card.def;

        let newRow = $("<tr>");
        newRow.data("id", id);

        newRow.append(`<th scope="row"><a class="row-head" id="th-${id}">${index + 1}</a></td>`)
        newRow.append(`<td><a style='cursor:pointer;' class='edit-term'>${question}</a></td>`)
        newRow.append(`<td><a style='cursor:pointer;' class='edit-def'>${answer}</a></td>`)
        newRow.append(`<td class="delete-row"><a style='cursor:pointer;color:red' class='delete-card'>Delete</a></td>`)

        return newRow;
    };

    const renderTable = deck => {
        $("#card-rows").empty();
        deck.forEach((card, index) => {
            let newRow = makeTableRow(card, index);
            console.log(index + 1)
            $("#card-rows").append(newRow);
        });
    };

    $(document).on("click", ".delete-card", function () {
        let id = $(this).parent("td").parent("tr").data("id")
        deleteCard(id)
    });

    $(document).on("click", "#back-decks", function () {
        window.location.href = '/display'
    });

    $(document).on("click", "#study-this", function () {
        window.location.href = '/card?deck_id=' + deckId;
    });

    $(document).on("click", ".edit-term", function () {
        let id = $(this).parent("td").parent("tr").data("id")
        let placeholder = $(this).text();
        $(this).parent("td").html(`<form id="form-term"><input type="text" id="input-term" value="${placeholder}"></form>`);

        $(`#form-term`).submit(event => {
            let card = {
                id: id,
                term: $("#input-term").val().trim()
            };

            handleRowChange(event, card);
        });
    });

    $(document).on("click", ".edit-def", function () {
        let id = $(this).parent("td").parent("tr").data("id")
        let placeholder = $(this).text();
        $(this).parent("td").html(`<form id="form-def"><input type="text" id="input-def" value="${placeholder}"></form>`)
        // $("#input-def").focus();

        $(`#form-def`).submit(event => {
            let card = {
                id: id,
                def: $("#input-def").val().trim()
            };

            handleRowChange(event, card);
        });
    });

})
