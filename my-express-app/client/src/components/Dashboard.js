import React from 'react';

function Dashboard(props) {
    console.log("what does it give me:", props.allEvents.title)
    console.log("test")

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
                            <p>Voting count</p>
                            <p>XXXX</p>
                            <button type="button" name="accept" >+</button> 
                            <button type="button" name="cancelVote" >-</button> 
                        </div>
                    </div>
                ))
            }

        </div>



    </div>
  )
}
export default Dashboard;
