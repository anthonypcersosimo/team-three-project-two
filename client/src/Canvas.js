import React, { useState } from 'react';
import DeckCard from './components/deckCard'

const Canvas = () => {

    const testDeck = {
        title: "React Basics",
        description: "A short introduction to the basics of React: state, props, hooks, etc."
    }

    const [deck] = useState(testDeck)

    return (
        <div>
            <div>
                <h1>Style That Snizz!</h1>
            </div>
            <div className="m-4">
                <DeckCard deck={deck}/>
            </div>
        </div>
    )
}

export default Canvas;