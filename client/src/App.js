import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import PrivateRoute from "./components/PrivateRoute";
import AddFormEvent from "./components/AddFormEvent";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();

  async function doLogin(username, password) {
    let uresponse = await Api.loginUser(username, password);
    if (uresponse.ok){
      Local.saveUserInfo(uresponse.data.token, uresponse.data.user);
      setUser(uresponse.data.user);
      setLoginErrorMsg('');
      navigate('/');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  async function doLogout(){
    Local.removerUserInfo();
    setUser(null);
    navigate('/');
  }

  return (

    <div className="App">
      <header>
        <h1>NUGGETS EVENT</h1>
      </header>

      <nav>
        <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div>
        {/* for this to work, remember to import { Routes, Route} */}
        <Routes>
          <Route path="/" element={<AddFormEvent 
            addEventFormCb={addEventForm}  
            />} 
          />

          <Route path="/dashboard" element={<Dashboard 
            allEvents={allEvents}
            // addVoteCb1={addVote}
            />} 
          />
        </Routes>
  
      </div>
    </div>

  );
}

export default App;