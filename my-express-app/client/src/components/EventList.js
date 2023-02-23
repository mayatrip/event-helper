import React from 'react';

function EventList(props) {
    return (
            {props.event.map(e => (
                    <div key={e.id}>
                        {e.date}
                        {}
                    </div>
            ))
            }
    );
}

export default EventList;