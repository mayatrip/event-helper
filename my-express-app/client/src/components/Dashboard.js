import React from 'react';

function Dashboard(props) {
    return (
        <div>
            { 
            props.allEventsCb.map(e => (
                <ul key={e.id}>
                    <div>
                        <p>Date {e.date}</p>
                        <p>{e.title}</p>
                        <p>Answer before: {e.deadline}</p>
                    </div>  

                    <div>
                        <h1>First activity</h1>
                        <p>{e.activityName}</p>
                        <p>Description: {e.description}</p>
                        <p>Price/person: {e.price}</p>
                        <p>URL{e.link}</p>
                        <p>Location: {e.location}</p>

                        <h1>Second activity</h1>
                        <p>{e.activityName}</p>
                        <p>Description: {e.description}</p>
                        <p>Price/person: {e.price}</p>
                        <p>URL: {e.link}</p>
                        <p>Location: {e.location}</p>
                    </div>
                </ul>

            ))
            }
        </div>
    );
}

export default Dashboard;