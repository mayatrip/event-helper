import React from "react";
import './VoteButton.css';

export default function VoteButton(props) {
  return (
    <div className="voteButton">
        Voting count
        <p className="voteButton">0</p>
        <button   
            type="button" 
            className="btn btn-warning" 
            onClick={props.clickCb}
            >
            Count on me
            </button> 
    </div>
  )
}

