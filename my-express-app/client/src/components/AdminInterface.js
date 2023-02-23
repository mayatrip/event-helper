import React from "react";
import AddFormEvent from "./AddFormEvent";
import Dashboard from "./Dashboard";



function AdminInterface(props) {

    return (
        <div>
        
        <AddFormEvent addEventFormCb2={props.addEventFormCb1} />
        <Dashboard />
        
        </div>
    );
}

export default AdminInterface;