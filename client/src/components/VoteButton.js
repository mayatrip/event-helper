import React from "react";
import './VoteButton.css';

let voteCount = {
    count: 0,
}


function VoteButton(props) {    
    function handleClick(event) {
        event.preventDefault();
        props.addVoteCb2(voteCount);
        console.log("someone vote yes")
    }

  return (
    <div className="voteButton">
        Voting count
        <p className="voteButton">0</p>
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

export default VoteButton;
