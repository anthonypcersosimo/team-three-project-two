import React from 'react';
import DeckCard from './components/deckCard'

const Canvas = () => {
    return (
        <div>
            <div>
                <h1>Style That Snizz!</h1>
            </div>
            <div className="m-4">
                <DeckCard />
            </div>
        </div>
    )
}

export default Canvas;