
$(document).ready(function () {

    const getCategories = () => {
        $.get('/api/decks', decks => {
            const distinctCategories = [...new Set(decks.map(deck => deck.category))]
            renderCategoryDD(distinctCategories)
        })
    }

    getCategories();

    const getDecks = (catParam) => {

        // Make this a ternary operatot
        if (catParam) {
            route = "/api/decks/" + catParam;
        } else {
            route = "/api/decks"
        }

        $.get(route, function (data) {
            decks = data;
            // logic to not render an empty table
            console.log(decks.length);
            if (decks.length === 0) {
                renderEmpty();
            }
            else {
                renderTable(decks)
                $("#filter-dd").removeClass("hidden");
            };

        });
    };

    const renderCategoryDD = distinctCategories => {
        $("#category-dd").empty();
        let noFilterLink = `<a class="dropdown-item" id="no-filter-link" href="">None</a>`;
        $("#category-dd").append(noFilterLink)
        distinctCategories.forEach(category => {
            let newDDLink = $("<a>")
            newDDLink.addClass("dropdown-item")
            newDDLink.addClass("category-link")
            newDDLink.text(category)
            newDDLink.data("category", category);
            $("#category-dd").append(newDDLink)
        })
    }

    const deleteDeck = (id) => {

        console.log(id)
        $.ajax({
            method: "DELETE",
            url: "api/decks/" + id
        })
            .then(function () {
                getDecks();
            });
    };

    // Getting the initial list of decks
    getDecks();

    const makeTableRow = (deck, index) => {
        let id = deck.id;
        let deckName = deck.deck_name;
        let category = deck.category;
        let cardsNum = deck.Flashcards.length;
        let newRow = $("<tr>");
        newRow.data("id", id);
        newRow.data("deck", deck);

        newRow.append(`<th scope="row">${index + 1}</th>`);
        newRow.append(`<td>${deckName}</td>`);
        newRow.append(`<td>${category}</td>`);
        newRow.append(`<td>${cardsNum}</td>`);
        newRow.append(`<td><a style='cursor:pointer;color:blue' class='study-deck mx-2'>Study</a><a style='cursor:pointer;color:green' class='edit-deck mx-2'>Edit</a><a style='cursor:pointer;color:red' class='delete-deck mx-2'>Delete</a></td>`)

        return newRow;
    }

    const renderTable = decks => {
        $("#deck-rows").empty();
        decks.forEach((deck, index) => {
            console.log("deck from render", deck)
            let newRow = makeTableRow(deck, index);
            $("#deck-rows").append(newRow);
        });
    };

    const renderEmpty = () => {
        console.log("I'm empty!")
        const deckContainer = $("#deck-table");
        deckContainer.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px", "font-size": "30px" });
        messageH2.html("Uh oh! You have not created a deck yet! Click the 'Add a Deck' nav button above to create a new deck.");
        deckContainer.append(messageH2);
    };

    $(document).on("click", ".category-link", function () {
        let category = $(this).data("category")
        getDecks(category)
    });


    $(document).on("click", ".study-deck", function (event) {
        event.preventDefault();
        let id = $(this).parent("td").parent("tr").data("id");
        window.location.href = '/card?deck_id=' + id;

    });
    $(document).on("click", ".edit-deck", function (event) {
        event.preventDefault();
        let id = $(this).parent("td").parent("tr").data("id");
        window.location.href = '/form?deck_id=' + id;
    });

    $(document).on("click", ".delete-deck", function (event) {
        event.preventDefault();
        let id = $(this).parent("td").parent("tr").data("id");
        console.log(id)
        deleteDeck(id)

    });



})