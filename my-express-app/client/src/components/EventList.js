import React from 'react';

function EventList(props) {
    return (
        <div>
            { 
            props.allEventsCb.map(e => (
                <div key={e.id}>
                {e.date}
                {e.title} 
                   
                </div>

            ))
            }

        </div>

    );
}

export default EventList;