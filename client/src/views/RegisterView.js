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
                type = "text"
                name = "passwordInput"
                required
                value = {password}
                onChange = {handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
        {props.loginErrorMsg && <h2>{props.loginErrorMsg}</h2>}
    </div>
  )
}