$(document).ready(function() {
    let deckId;
    let deckName;
    let deck = []; 
    
    const getCards = deckId => $.get("api/flashcards/deck/" + deckId, response => {
        deck = response;
        console.log(deck)
    })
});

function roll() {
    $('.roll-header-inner').toggleClass('rolled');
    flip();
};
// changes the class of the card face which animates the flip and toggles the side shown
function flip() {
    $('.flip-card-inner').toggleClass('flipped');
};


// need way to get deck name and display in deck title

// need way to get card from selected deck and display question on question side of card/

// need way to get card from selected deck and display answer on answer side of card

// need way to get last card

// need way to get next card

