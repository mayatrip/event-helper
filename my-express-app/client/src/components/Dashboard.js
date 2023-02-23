import React from 'react';

function Dashboard(props) {
    return (
        <div>
            { 
            props.allEventsCb.map(e => (
                <ul key={e.id}>
                    <div>
                        <p>{e.date}</p>
                        <p>{e.title}</p>
                        <p>{e.deadline}</p>
                    </div>  

                    <div>
                        <p>{e.activityName}</p>
                        <p>{e.description}</p>
                        <p>{e.price}</p>
                        <p>{e.link}</p>
                        <p>{e.location}</p>
                    </div>
                </ul>

            ))
            }
        </div>
    );
}

export default Dashboard;