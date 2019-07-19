$(document).ready(function () {

    let deckId;
    let deckName;
    let deck = [];
    let decks = [];

    $("#card-form").submit(event => handleCardSubmit(event));
    $("#deck-form").submit(event => handleDeckSubmit(event));
    $("#complete").click(event => handleFinish(event));

    var url = window.location.search;

    const getCards = deckId => $.get("api/flashcards/deck/" + deckId, response => {
        deck = response;
        console.log("deck response", deck)
        renderTable(deck)
        $("#card-table").removeClass("hidden")
    });

    const getDecks = (catParam) => {

        if (catParam) {
            route = "/api/decks/" + catParam;
        } else {
            route = "/api/decks"
        }

        $.get(route, function (data) {
            console.log("Decks", data);
            decks = data;
            if (decks.length > 0) {
                $("#decks-dd").removeClass("hidden");
                renderDecksDD();
            }
        });
    };

    const renderDecksDD = () => {
        $("#edit-deck-list").empty();
        decks.forEach(deck => {
            let newDDLink = $("<a>")
            newDDLink.addClass("dropdown-item")
            newDDLink.addClass("deck-link")
            newDDLink.text(deck.deck_name)
            newDDLink.data("deckId", deck.id);
            console.log(newDDLink.data("deckId"))
            $("#edit-deck-list").append(newDDLink)
        })
    }

    getDecks();

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
            term: $("#question").val().trim(),
            def: $("#answer").val().trim(),
            DeckId: deckId
        };

        submitCard(card)
            .then($("#card-form").trigger("reset"))
            .then(() => window.location.href = "/display");
    }

    const submitDeck = deckName => $.post("/api/decks", deckName, response => {
        deckId = response
        // $("#study-this").attr("href", "/card?deck_id=" + deckId)
        getDecks();
    });

    const submitCard = flashcard => $.post("/api/flashcards/", flashcard, response => lastCardId = response);

    const handleDeckSubmit = event => {
        event.preventDefault();
        deckName = $("#deck-name").val().trim();
        deckCategory = $('#deck-category').val().trim();

        if (!deckName || !deckCategory) return;
        let deck = {
            deck_name: deckName,
            category: deckCategory
        }
        submitDeck(deck)
            .then($("#deck-form").trigger("reset"))
            .then($("#deck-form").addClass("hidden"))
            .then($("#card-form").removeClass("hidden"))
    };

    const handleCardSubmit = event => {
        event.preventDefault();
        let term = $("#question").val().trim();
        let def = $("#answer").val().trim();

        if (!term || !def) return;

        let card = {
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
        let question = card.term.length > 30 ? card.term.slice(0, 30) + "..." : card.term;
        let answer = card.def.length > 30 ? card.def.slice(0, 30) + "..." : card.def;

        let newRow = $("<tr>");
        newRow.data("id", id);
        newRow.data("card", card)

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

    // Get the modal
    var modal = document.getElementById("myModal");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        }
    };

    $(document).on("click", "#study-this", function (event) {
        event.preventDefault();
        if (deck.length > 0) {
            window.location.href = '/card?deck_id=' + deckId;
            console.log("attempt to go to study deck")
        }
        else {
            console.log("cant study a deck with no cards sucka!");
            modal.style.display = "block";
        }
    });

    $(document).on("click", ".deck-link", function () {
        let deckLinkId = $(this).data("deckId");
        console.log(deckLinkId);
        getCards(deckLinkId)
    });

    $(document).on("click", ".edit-term", function () {
        let id = $(this).parent("td").parent("tr").data("id")
        let placeholder = $(this).parent("td").parent("tr").data("card").term
        $(this).parent("td").html(`<form id="form-term"><div class="form-group"><input type="text" id="input-term" value="${placeholder}"></div></form>`);
        $("#input-term").focus();
        $(`#form-term`).focusout((event) => {
            let card = {
                id: id,
                term: $("#input-term").val().trim()
            };

            handleRowChange(event, card);
        });
        $(`#form-term`).submit((event) => {
            let card = {
                id: id,
                term: $("#input-term").val().trim()
            };

            handleRowChange(event, card);
        });
    });

    $(document).on("click", ".edit-def", function () {
        let id = $(this).parent("td").parent("tr").data("id")
        let placeholder = $(this).parent("td").parent("tr").data("card").def
        $(this).parent("td").html(`<form id="form-def"><div class="form-group"><input type="text" id="input-def" value="${placeholder}"></div></form>`)
        $("#input-def").focus();
        $(`#form-def`).focusout((event) => {
            let card = {
                id: id,
                def: $("#input-def").val().trim()
            };

            handleRowChange(event, card);
        });
        $(`#form-def`).submit((event) => {
            let card = {
                id: id,
                def: $("#input-def").val().trim()
            };

            handleRowChange(event, card);
        });
    });

})
