import React, { useState } from "react";
import './VoteCount.css';

let voteCount = {
    count: 0,
}


function VoteCount(props) {    
    function handleClick(event) {
        event.preventDefault();
        props.addVoteCb2(voteCount);
        console.log("someone vote yes")
    }

  return (
    <div className="voteCount">
        Voting count
        <p className="voteCount">0</p>
        <button   
            type="button" 
            className="btn btn-warning" 
            name="voteInc" 
            onClick={handleClick}
            >
            Count on me
            </button> 
    </div>
  )
}

export default VoteCount;
