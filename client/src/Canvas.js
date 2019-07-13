import React from 'react';
// import React, { useState } from 'react';
// import DeckCard from './components/deckCard'
import LoginForm from './components/LoginForm'
import './Canvas.css'

const Canvas = () => {

    return (
        <div>
            <div className="canvas-header">
                <h1 className="code-font font-maroon">Build them 'ponents!</h1>
            </div>
            <div className="">
               <LoginForm />
            </div>
        </div>
    )
}

export default Canvas;