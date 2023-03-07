import React, { useState, useEffect } from 'react';
import Api from '../helpers/Api';

function DashboardView(props) {
const[allEvents, setAllEvents] = useState([]);
const [allKeyInfo, setKeyInfo] = useState([]);
const [attendingEvents, setAttendingEvents] = useState([]);


useEffect(() => {
    if(props.user) {
      getEvents();
    }
  }, []);

  useEffect(() => {
    if(props.user) {
      getKeyInfo();
    }
  }, []);

  useEffect(() => {
      getUserEvents(props.user.id);
  }, [props.user.activities]);

  const getUserEvents = async id => {
    let uresponse = await Api.getOneUser(id);
    if (uresponse.ok){
        let userInfo = uresponse.data;
        let userEvents = userInfo.activities.map(a => a.id);
        setAttendingEvents(userEvents);
    } else {
        console.log(`Error! ${uresponse.error}`);
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

  async function getKeyInfo() {
    let uresponse = await Api.getContent('/keyInfo');
    if (uresponse.ok){
      setKeyInfo(uresponse.data);
    } else{
      console.log(`Error! ${uresponse.error}`);
    }
  }

const handleClick = (id) => {
    console.log(id);
    let selectedEvent = allEvents.find(i => i.id === id);
    let newCount = selectedEvent.votes + 1;
    let voteObj = {count: newCount, id: id, userId: props.user.id};
    getEvents();
    getUserEvents(props.user.id);
    props.addVoteCb(id, voteObj);
}

  return (
    <div className='DashboardView'>
        {
            allEvents.map(e => (
                <div key={e.id}>
                    <div className='subGrid'>
                        <h2>To remember </h2>
                            <p>Save the date for {(allKeyInfo.find(i => i.keyInfo_id === e.keyInfo_id)) ? (allKeyInfo.find(i => i.keyInfo_id === e.keyInfo_id)).title : ""} on {(allKeyInfo.find(i => i.keyInfo_id === e.keyInfo_id)) ? (allKeyInfo.find(i => i.keyInfo_id === e.keyInfo_id)).date : ""}
                            </p>
                            <p>Answer before {(allKeyInfo.find(i => i.keyInfo_id === e.keyInfo_id)) ? (allKeyInfo.find(i => i.keyInfo_id === e.keyInfo_id)).deadline : ""}</p>
                        <h2>Activity Info</h2>
                        <ul>
                          <li>{e.name}</li>
                          <li>{e.description}</li>
                          <li>{e.location}</li>
                          <li>Price/person £{e.price}</li>
                        </ul>
                        {!attendingEvents.includes(e.id) &&
                        <div>
                            <button type="button" onClick={event => handleClick(e.id)}>Count on Me</button>
                        </div>}
                        {attendingEvents.includes(e.id) && <div>
                            You're attending this event!
                        </div>}
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Who is coming?
                                </button>
                                </h2>
                                <div id={"collapseTwo"} className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                {(e.users.length > 0) && <ul>
                                  {e.users.map(u => (
                                      <li key={u.id}>
                                          {u.username}
                                      </li>
                                    ))}
                                </ul> 
                                }
                                {e.users.length === 0 && <p>No attendees yet</p>
                                }
                                </div>
                                </div>
                            </div>
                            </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
export default DashboardView;
