import React, { useState, useEffect } from 'react';

export default function RegisterView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        props.setLoginErrorMsgCb();
      }, []);

    const handleChange = (event) => {
        let { name, value } = event.target;
        switch (name) {
            case 'usernameInput':
                setUsername(value);
                break;
            case 'passwordInput':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.registerUserCb(username, password)
    }
  return (
    <div className="RegisterView" onSubmit={handleSubmit}>
        <form>
            <label>Choose a Username:
                <input
                type = "text"
                name = "usernameInput"
                required
                value = {username}
                onChange = {handleChange}
                />
            </label>
            <label>Choose a Password:
                <input
                type = "password"
                name = "passwordInput"
                required
                value = {password}
                onChange = {handleChange}
                />
            </label>
            <div className="span-2-cols">
                <button className="btn btn-warning" type="submit">Submit</button>
            </div>
        </form>
        {props.loginErrorMsg && 
            <div className="alert alert-warning">
                <h2>{props.loginErrorMsg}</h2>    
            </div>}
    </div>
  )
}