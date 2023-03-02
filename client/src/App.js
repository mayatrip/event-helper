import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import PrivateRoute from "./components/PrivateRoute";
import AddFormEvent from "./components/AddFormEvent";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/LoginView";
import EventsVoteView from "./views/EventsVoteView";
import AddEventView from "./views/AddEventView";

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
      navigate('/dashboard');
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
        <Link to="/">Home</Link> 
        <Link to="/dashboard">All Events</Link>
        <Link to="/events">Vote!</Link>
        <Link to="/add-event">Add Events</Link>
        {user && <Link to="/" onClick={doLogout}>Logout</Link>}
      </nav>

      <div>
        {/* for this to work, remember to import { Routes, Route} */}
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<LoginView doLoginCb={(username, password) => doLogin(username, password)}/>} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardView/>
            </PrivateRoute>
          } />
          <Route path="/events" element={
            <PrivateRoute>
              <EventsVoteView/>
            </PrivateRoute>
          } />
          <Route path="/add-event" element={
            <PrivateRoute>
              <AddEventView/>
            </PrivateRoute>
          } />
        </Routes>
  
      </div>
    </div>

  );
}

export default App;