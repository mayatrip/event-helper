import React from 'react';
import VoteButton from '../components/VoteButton';

function DashboardView(props) {

const handleClick = (id) => {
    console.log(id);
    let selectedEvent = props.allEvents.find(i => i.activities_id === id);
    let newCount = selectedEvent.votes + 1;
    let newAttending = selectedEvent.attending + props.user.username;
    let voteObj = {count: newCount, attending: newAttending};
    console.log("VOTE OBJ", voteObj, id);
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
                        <div>
                            <button type="button" onClick={event => handleClick(e.activities_id)}>Count on Me</button>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
export default DashboardView;
