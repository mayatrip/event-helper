import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import PrivateRoute from "./components/PrivateRoute";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/LoginView";
import AddEventView from "./views/AddEventView";
import RegisterView from "./views/RegisterView";
import HomeView from "./views/HomeView";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();
  const[allEvents, setAllEvents] = useState([]);
  const [visibleAlert, setAlertVisible] = useState(false);
  const [allKeyInfo, setKeyInfo] = useState([]);

  useEffect(() => {
    if(user) {
      getEvents();
      getKeyInfo();
    }
  }, []);

  const handleVisible = () => {
    setAlertVisible(true)
    setTimeout(() => {
        setAlertVisible(false)
    }, 2000);
  }

  const resetError = () => {
    setLoginErrorMsg('');
  }

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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  }

  async function registerUser(username, password){
    let uresponse = await Api.registerUser(username, password);
    if (uresponse.ok){
      handleVisible();
      setLoginErrorMsg('');
      navigate('/dashboard');
      handleVisible();
    } else if (uresponse.status === 400){
      setLoginErrorMsg('Username taken');
      } else {
      setLoginErrorMsg('Registration failed');
  }
}

  async function getEvents() {
    let uresponse = await Api.getContent('/events');
    if (uresponse.ok){
      setAllEvents(uresponse.data);
    } else{
      console.log(`Error! ${uresponse.error}`);
    }
  }

  async function addVote(id, voteObj){
    console.log("APP VIEW", voteObj, id);
    let uresponse = await Api.addVote(id, voteObj);
    if (uresponse.ok){
      setAllEvents(uresponse.data);
    } else {
      console.log(`Error! ${uresponse.error}`);
    }
  }

  async function getKeyInfo() {
    let uresponse = await Api.getContent('/keyInfo');
    if (uresponse.ok){
      setKeyInfo(uresponse.data);
    } else{
      console.log(`Error! ${uresponse.error}`);
    }
  }

  return (

    <div className="App">
      <nav>
        <div className="left">
          <Link to="/">Home</Link> 
          <Link to="/dashboard">All Events</Link>
          <Link to="/add-event">Add Events</Link>
        </div>
        <div className="right">
          {user && <Link to="/" onClick={doLogout}>Logout</Link>}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Create an Account</Link>}
        </div>
      </nav>

      <div>
        {visibleAlert && <h1>Account created, please login</h1>}
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView setLoginErrorMsgCb={e => resetError()} loginErrorMsg={loginErrorMsg} doLoginCb={(username, password) => doLogin(username, password)}/>} />
          <Route path="/register" element={<RegisterView setLoginErrorMsgCb={e => resetError()} loginErrorMsg={loginErrorMsg} registerUserCb={(username, password) => registerUser(username, password)}/>} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardView allKeyInfo={allKeyInfo} allEvents={allEvents} user={user} addVoteCb={(id, voteObj) => addVote(id, voteObj)}/>
            </PrivateRoute>
          } />
          <Route path="/add-event" element={
            <PrivateRoute>
              <AddEventView user={user}/>
            </PrivateRoute>
          } />
        </Routes>
  
      </div>
    </div>

  );
}

export default App;