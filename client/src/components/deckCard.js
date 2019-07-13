import React, { useState } from 'react'
import '../Canvas.css';
import '../index.css';

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