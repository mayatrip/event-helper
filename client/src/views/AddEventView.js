import React from 'react';
import AddFormEvent from '../components/AddFormEvent';

export default function AddEventView(props) {
  return (
    <div>
        <h1>AddEventView</h1>
        <AddFormEvent user={props.user}/>

    </div>
  )
}
