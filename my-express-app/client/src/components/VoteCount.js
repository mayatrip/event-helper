import React from 'react';
import './VoteCount.css';

let count = {
    count: 0,
}

function VoteCount() {


  return (
    <div className="voteCount">
        Voting count
        <p className="voteCount">XXX</p>
        <button type="button" class="btn btn-warning" name="accept" >+</button> 
        <button type="button" class="btn btn-warning" name="cancelVote" >-</button> 

    </div>
  )
}

export default VoteCount;
