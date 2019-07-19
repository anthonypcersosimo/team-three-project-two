
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
            renderTable(decks)
            $("#filter-dd").removeClass("hidden");

            // add logic to not render an emoty table

        });
    };

    // render categories uses the new Set functionality from es6 to return only the distinct category values from the array of decks
    const renderCategoryDD = distinctCategories => {
        $("#category-dd").empty();
        // const distinctCategories = [...new Set(decks.map(deck => deck.category))]
        // console.log(distinctCategories);
        let noFilterLink = `<a class="dropdown-item" id="no-filter-link" href="">None</a>`;
        $("#category-dd").append(noFilterLink)
        distinctCategories.forEach(category => {
            let newDDLink = $("<a>")
            newDDLink.addClass("dropdown-item")
            newDDLink.addClass("category-link")
            newDDLink.text(category)
            // let newDDLink = $(`<a class="dropdown-item" href="">${category}</a>;`)
            newDDLink.data("category", category);
            $("#category-dd").append(newDDLink)
        })
    }

    // This function does an API call to delete decks
    deleteDeck = (id) => {

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
        // console.log("deck from row builder", deck)
        let id = deck.id;
        let deckName = deck.deck_name;
        let category = deck.category;
        let cardsNum = deck.Flashcards.length;
        // console.log(id, deckName, category, cardsNum)
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
            // console.log(index + 1)
            $("#deck-rows").append(newRow);
        });
    };

    $(document).on("click", ".category-link", function () {
        let category = $(this).data("category")
        // console.log(category)
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