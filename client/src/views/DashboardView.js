import React, {useState, useEffect} from 'react';
import Api from '../helpers/Api';

function DashboardView(props) {
const [attendingEvents, setAttendingEvents] = useState([]);

useEffect(() => {
    getUserEvents(props.user.id);
  }, []);

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

const handleClick = (id) => {
    let selectedEvent = props.allEvents.find(i => i.activities_id === id);
    let newCount = selectedEvent.votes + 1;
    let voteObj = {count: newCount, activities_id: id, userId: props.user.id};
    getUserEvents(props.user.id);
    getUserEvents(props.user.id);
    props.addVoteCb(id, voteObj);
}

  return (
    <div className='DashboardView'>

        {
            props.allEvents.map(e => (
                <div key={e.activities_id}>
                    <div className='subGrid'>
                        <h2>To remember</h2>
                            <p>Save the date for title on date</p>
                            <p>Answer before </p>
                        <h2>Activity Info</h2>
                            <ul>
                            <li>{e.activityName}</li>
                            <li>{e.description}</li>
                            <li>{e.location}</li>
                            <li>Price/person £{e.price}</li>
                            </ul>
                        {!attendingEvents.includes(e.activities_id) && <div>
                            <button type="button" className="btn btn-warning" onClick={event => handleClick(e.activities_id)}>Count on Me</button>
                        </div>}
                        {attendingEvents.includes(e.activities_id) && <div>
                            You're attending this event!
                        </div>}
                    </div>
                </div>
            ))
        }
    </div>
  )
}
export default DashboardView;
