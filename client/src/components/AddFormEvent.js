import React, { useState } from "react";
import './AddFormEvent.css';
import Api from "../helpers/Api";

const INIT_STATE = {
    date: '',
    title: '',
    deadline: '',

    activityNameOne: '',
    descriptionOne: '',
    priceOne: 0,
    locationOne: '',

    activityNameTwo: '',
    descriptionTwo: '',
    priceTwo: 0,
    locationTwo: '',

}


function AddFormEvent(props) {
    const [formData, setFormData] = useState(INIT_STATE);

    async function addEvent(eventObj){
        let uresponse = await Api.addEvent(eventObj);
        if (uresponse.ok){
            console.log('success');
        } else {
            console.log(`Error! ${uresponse.error}`);
        }
    }

    function handleChange(event) {
        let {name, value} = event.target;
        let newFormData = {...formData};
        newFormData[name] = value;
        newFormData.user = props.user.id
        setFormData (newFormData);
    }

    function handleSubmit(event) {
        event.preventDefault();
        addEvent(formData);
        setFormData(INIT_STATE);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="gridDiv">
                    <h2>Event Info</h2>


                    <label className="col-sm">
                        Event Name:
                        <input 
                        type= "text"
                        name= "title"
                        value={formData.title}
                        onChange={handleChange}
                        />
                    </label>

                        <label className="col-sm" >
                            Date:
                            <input 
                            type= "text"
                            name= "date"
                            value={formData.date}
                            onChange={handleChange}
                            />
                        </label>

                    <label className="col-sm">
                        Reply Before:
                        <input 
                        type= "text"
                        name= "deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="gridDiv">
                    <h2> Activity One</h2>


                    <label >
                        Name:
                        <input 
                        type= "text"
                        name= "activityNameOne"
                        value={formData.activityNameOne}
                        onChange={handleChange}
                        />
                    </label>

                    <label >
                        Description:
                        <textarea
                        name= "descriptionOne"
                        value={formData.descriptionOne}
                        onChange={handleChange}
                        /> 
                    </label>

                    <label >
                        Price:
                        <input 
                        type= "number"
                        name= "priceOne"
                        value={formData.priceOne}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Location:
                        <input 
                        type= "text"
                        name= "locationOne"
                        value={formData.locationOne}
                        onChange={handleChange}
                        />
                    </label>  
                </div>
                                                         
                <div className="gridDiv">
                    <h2> Activity Two</h2>
                    <label>
                        Name:
                        <input 
                        type= "text"
                        name= "activityNameTwo"
                        value={formData.activityNameTwo}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                        name= "descriptionTwo"
                        value={formData.descriptionTwo}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Price:
                        <input 
                        type= "number"
                        name= "priceTwo"
                        value={formData.priceTwo}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Location:
                        <input 
                        type= "text"
                        name= "locationTwo"
                        value={formData.locationTwo}
                        onChange={handleChange}
                        />
                    </label> 
                </div>
                    
                <div className="grid3Col">
                    <button type="submit" className="btn btn-warning">Submit</button>
                </div>

            </form>
        </div>
    );
}

export default AddFormEvent;
