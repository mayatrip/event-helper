import React from 'react';
import './Dashboard.css';
import VoteCount from './VoteCount';

function Dashboard(props) {
    console.log("from the dash:", props.allEvents);

  return (
    <div className='thumbGrid'>
        {
            props.allEvents.map(e => (
                <div key={e.id}>
                    <div className='subGrid'>
                        <h2>To remember</h2>
                            <p>Save the date for {e.title} on {e.date}</p>
                            <p>Answer before {e.deadline}</p>
                        <h2>Activity Info</h2>
                            <ul>
                            <li>{e.activityName}</li>
                            <li>{e.description}</li>
                            <li>{e.location}</li>
                            <li>Price/person £{e.price}</li>
                            </ul>
                        <div>
                            <VoteCount addVoteCb2={props.addVoteCb1}/>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
export default Dashboard;
