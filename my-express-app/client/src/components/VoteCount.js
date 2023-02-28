import React, { useState } from "react";
import './VoteCount.css';

let voteCount = {
    count: 0,
}


function VoteCount(props) {
const [voteInc, setVoteInc] = useState (voteCount);
    
    function handleClick(event) {
        event.preventDefault();
        props.addVoteCb2(voteInc);
        console.log("someone vote yes")
    }

  return (
    <div className="voteCount">
        Voting count
        <p className="voteCount">XXX</p>
        <button   
            type="button" 
            class="btn btn-warning" 
            name="voteInc" 
            onClick={handleClick}
            >
            Count on me
            </button> 
    </div>
  )
}

export default VoteCount;
