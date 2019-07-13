// import React from 'react';
import React, { useState } from 'react';
// import DeckCard from './components/deckCard'
import LoginForm from './components/LoginForm'
import './Canvas.css'

const Canvas = () => {
    
    const initialUserState = { userName: '', password: '' }

    const [user, setUser] = useState(initialUserState)

    const logUserIn = (inputUser) => {

        setUser({userName: inputUser.userName, password: inputUser.password})
        
        console.log(inputUser)
        console.log(`User: ${user}`)
        console.log(`${user.userName} is logged in!`)
        console.log(`${inputUser.userName} is logged in!`)
    }
    return (
        <div>
            <div className="canvas-header">
                <h1 className="code-font font-maroon">Build them 'ponents!</h1>
            </div>
            <div className="">
               <LoginForm logUserIn={logUserIn} />
            </div>
        </div>
    )
}

export default Canvas;