import React, { useState } from 'react';
import '../Canvas.css';

const LoginForm = (props) => {
    
    const initialFormState = { userName: '', password: '' }

    const [user, setUser] = useState(initialFormState)
    

    const handelInputChange = event => {
        const { name, value } = event.target
        setUser({...user, [name]: value})
    }

    return (
        <form 
            onSubmit={event => {
                event.preventDefault()
                if (!user.userName || !user.password) return
                console.log(user.userName, user.password)
                props.logUserIn(user)
                // setUser(initialFormState)
            }}
            >
                <label>User Name:</label>
                <input type="text" name="userName" value={user.userName} onChange={handelInputChange} />
                <label>Password</label>
                <input type="text" name="password" value={user.password} onChange={handelInputChange} />
                <br></br>
                <button className="btn btn-primary">Submit</button>
            </form>
    )
}

export default LoginForm;