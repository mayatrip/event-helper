import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import Local from '../helpers/Local';

export default function PrivateRoute(props) {

  //Redirect to /login if anonymous user
  let userId = Local.getUserId();
  if (!userId) {
    return <Navigate to="/login" />;
  }

  //Render child component(s)
  return (
    <>
        {props.children}
    </>
  )
}
