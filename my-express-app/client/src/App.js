import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
// import EventList from "./components/EventList";

function App() {
  let [allEvent, setAllEvent] = useState([]);

  // useEffect() will call getDucks() when App is mounted on the DOM
  useEffect(() => {
    getEvent();  
  }, []);
  // the empty [] means only call it once

  //Get all the events
  async function getEvent() {
    try {
      let response = await fetch('/event');
      if (response.ok) {
        let data = await response.json();
        setAllEvent(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch(err) {
      console.log(`Network error: ${err.message}`);
    }

  //Post a new event
  async function addEvent() {

  }

  }

  return (
    <div className="App">
      <header className="App-header">
        
        {/* <EventList event={event}/> */}
        checking if it's working
    
      </header>
    </div>
  );
}

export default App;
