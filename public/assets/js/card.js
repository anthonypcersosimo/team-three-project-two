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
    setTimeout(function(){ flip(); }, 0500);
    };

// changes the class of the card face which animates the flip and toggles the side shown
function flip() {
    $('.flip-card-inner').toggleClass('flipped');
    setTimeout(function(){ alert("Hello"); }, 3000);
    };


// Questions I have:

// #1) When a user selects a deck at the previous screen, what tells my files what was selected so they know what to load?

// #2) How do I take the selected deck and split into individual pairings of questions/answers (single card) and what becomes the card identifer? (for going back and forth through the deck)



