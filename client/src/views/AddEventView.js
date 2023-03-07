import React from 'react';
import AddFormEvent from '../components/AddFormEvent';

export default function AddEventView(props) {
  return (
    <div>
      <h2 style={{borderBottom:"1px solid #ffbc0d", paddingTop:"10px", paddingBottom:"10px"}}>Add An Event</h2>
        <AddFormEvent user={props.user}/>

    </div>
  )
}
