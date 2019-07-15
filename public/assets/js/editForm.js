$(document).ready(function () {

    let url = window.location.search;
    let deckId;

    if (url.indexOf("?deck_id=") !== -1) {
        deckId = url.split("=")[1];
        getCards(deckId);
    }


})