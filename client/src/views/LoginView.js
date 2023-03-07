import React, { useState, useEffect } from 'react';

export default function LoginView(props) {
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
        props.doLoginCb(username, password)
    }
  return (
    <div className="LoginView" onSubmit={handleSubmit}>
        <form>
            <label>Username:
                <input
                type = "text"
                name = "usernameInput"
                required
                value = {username}
                onChange = {handleChange}
                />
            </label>
            <label>Password:
                <input
                type = "text"
                name = "passwordInput"
                required
                value = {password}
                onChange = {handleChange}
                />
            </label>
            <button type="submit">Submit</button>
            {props.loginErrorMsg && <h2>{props.loginErrorMsg}</h2>}
        </form>
    </div>
  )
}
