import React from 'react';

function DashboardView(props) {
    console.log("from the dash:", props.allEvents);

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
                            Vote Count Component was here
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
export default DashboardView;
