import React, { useState } from 'react';
import '../Canvas.css';

const LoginForm = () => {
    
    const initialUserState = {
        userName: '',
        password: ''
    }

    const [user, setUser] = useState(initialUserState)
    const [inputUser, setInputUser] = useState(initialUserState)

    const handelInputChange = event => {
        
        const target = event.target
        const value = target.value
        const name = target.name
        
        setInputUser({
            [name]: value
        })
    }

    return (
        <form 
            onSubmit={event => {
                event.preventDefault()
                if (!inputUser.userName || !inputUser.password) return
                setUser(inputUser)
                console.log(`${user.userName} is logged in!`)
                setInputUser(initialUserState)
            }}
            >
                <label>User Name:</label>
                <input type="text" name="userName" value={inputUser.userName} onChange={handelInputChange} />
                <input type="text" name="password" value={inputUser.password} onChange={handelInputChange} />
                <button className="btn btn-warning">Submit</button>
            </form>
    )
}

export default LoginForm;