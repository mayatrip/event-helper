import React, { useEffect, useState } from "react";
import './App.css';
import AddFormEvent from "./components/AddFormEvent";
import EventList from "./components/EventList";

function App() {
  let [allEvents, setAllEvents] = useState([]);

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
        setAllEvents(data);
      } else {
        console.log(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch(err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  //Post a new event
  async function addEventForm(event) {
    //define fetch() options

    //create a copy of my event object
    //then edit that copy so that the price property has a value that correspond to a number and not a string
    let newEvent = {...event};
    newEvent.price = Number(newEvent.price); //reference that element to become the new one
    let options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newEvent)//name of the copy
    };

    try {
      let response = await fetch('/event', options); //do post
      if (response.ok) {
        let event = await response.json()
        setAllEvents(event);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    }catch (err) {
      console.log(`Server error: ${err.message}`);
    }

  }



  return (
    <div className="App">
      <header>
        TEST TEST
      </header>
      <AddFormEvent addEventFormCb={addEventForm} />
        
      <EventList allEventsCb={allEvents}/>
        checking if it's working
    


    </div>

  );
}

export default App;
