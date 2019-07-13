import React, { useState } from 'react'
import '../Canvas.css';

const DeckCard = (props) => {
    
    const [deck] = useState(props.deck)

    return (
        <div className="card deck-card code-font shadow p-3 mb-5 bg-white rounded">
            <div className="card-body">
                <h5 className="card-title font-maroon">{deck.title}</h5>
                <br></br>
                <p className="card-text">{deck.description}</p>
            </div>
        </div>
    )
}
export default DeckCard;

// Deep Thoughts With Jack Handy: use validation on the deck build form to limit the length of title and description to force them to fit on card without fucking the styling.

// Canvas component test code setup below:


// const Canvas = () => {

//     const testDeck = {
//         title: "React Basics",
//         description: "A short introduction to the basics of React: state, props, etc."
//     }

//     const [deck] = useState(testDeck)

//     return (
//         <div>
//             <div>
//                 <h1>Style That Snizz!</h1>
//             </div>
//             <div className="m-4">
//                 <DeckCard deck={deck}/>
//             </div>
//         </div>
//     )
// }