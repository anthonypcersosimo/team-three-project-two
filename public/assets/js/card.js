$(document).ready(function () {
    let deckId;
    let deck = [];
    let count = 0;
    // assigns the url from the lead in page 
    let url = window.location.search;

    const getCards = deckId => $.get("api/flashcards/deck/" + deckId, response => {
        deck = response;
        console.log("response", deck)
        displayCard(deck);
    });

    // grabs the deck id from the lead in page's url and assigns it to deckID
    if (url.indexOf("?deck_id=") !== -1) {
        deckId = url.split("=")[1];
        console.log(deckId);
        getCards(deckId);
    };

    function displayCard(deck) {
        let title = $('.deckTitle')
        let question = $('.cardQuestionText')
        let answer = $('.cardAnswerText')
        title.text(deck[count].Deck.deck_name)
        question.text(deck[count].term)
        answer.text(deck[count].def)
    }

    $('.next').on('click', function () {
        if (count === deck.length - 1) return;
        count++;
        returnFront();
        nextCard();
        setTimeout(function() { displayCard(deck); }, 1000);
    });

    $('.last').on('click', function () {
        if (count === 0) return;
        count--;
        returnFront();
        previousCard();
        setTimeout(function() { displayCard(deck); }, 1000);
    })

});

function roll() {
    $('.cardHeader').toggleClass('rolled');
    setTimeout(function() { flip(); }, 500);
};

// changes the class of the card face which animates the flip and toggles the side shown
function flip() {
    $('.cardBody').toggleClass('flipped');
};

function returnFront() {
    if ($('.cardBody').hasClass('flipped') !== true) {
        $('.cardBody').removeClass('flipped'); 
        $('.cardHeader').removeClass('rolled'); 
     } else {
            roll();
     }
};

const previousCard = () => {
    $('.cardBody').addClass('slide-out-left');
    setTimeout(function() { removeSlideLeft(); }, 1000);
};
const  nextCard = () => {
    $('.cardBody').addClass('slide-out-right');
    setTimeout(function() { removeSlideRight(); }, 1000);
};

const removeSlideLeft = () => {
    $('.cardBody').removeClass('slide-out-left');
};

const removeSlideRight = () => {
    $('.cardBody').removeClass('slide-out-right');
};

