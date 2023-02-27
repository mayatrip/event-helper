import React from 'react';
import VoteCount from './VoteCount';

// const voteCount = {
//     count: 0
// }

function Dashboard(props) {

  return (
    <div>
        <div>
            {
                props.allEvents.map(e => (
                    <div key={e.id}>
                        <h2>Info</h2>
                            <p>{e.date}</p>
                            <p>{e.title}</p>
                            <p>Answer before: {e.deadline}</p>
                        <h3>Activities</h3>
                            <p>{e.activityName}</p>
                            <p>{e.description}</p>
                            <p>{e.location}</p>
                            <p>Price/person £{e.price}</p>
                        <div>
                            <VoteCount/>
                        </div>
                    </div>
                ))
            }

        </div>



    </div>
  )
}
export default Dashboard;
