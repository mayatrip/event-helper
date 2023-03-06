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
    const [activityOne, setActivityOne] = useState([]);
    const [activityTwo, setActivityTwo] = useState([]);

    async function addEvent(eventObj){
        let uresponse = await Api.addEvent(eventObj);
        if (uresponse.ok){
            console.log('success');
        } else {
            console.log(`Error! ${uresponse.error}`);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(activityOne)
        addEvent(activityOne);
        if (activityTwo.activityName){
            console.log(activityTwo);
            addEvent(activityTwo);
        }
        setFormData(INIT_STATE);
    }

    function handleChange(event) {
        let {name, value} = event.target;
        setFormData (data => ({...data, [name]: value}));
        let actOne = {
            date: formData.date,
            title: formData.title,
            deadline: formData.deadline,
            activityName: formData.activityNameOne,
            description: formData.descriptionOne,
            price: formData.priceOne,
            location: formData.locationOne
        };
        let actTwo = {
            date: formData.date,
            title: formData.title,
            deadline: formData.deadline,
            activityName: formData.activityNameTwo,
            description: formData.descriptionTwo,
            price: formData.priceTwo,
            location: formData.locationTwo,
            duplicate: true
        };
        setActivityOne(actOne);
        setActivityTwo(actTwo);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="gridDiv">
                    <h2>Main info</h2>
                        <label className="col-sm" >
                            Date
                            <input 
                            type= "text"
                            name= "date"
                            value={formData.date}
                            onChange={handleChange}
                            />
                        </label>
   

                    <label className="col-sm">
                        Title
                        <input 
                        type= "text"
                        name= "title"
                        value={formData.title}
                        onChange={handleChange}
                        />
                    </label>

                    <label className="col-sm">
                        Due date
                        <input 
                        type= "text"
                        name= "deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        />
                    </label>
                </div>

                <div className="gridDiv">
                    <h2> Activity A</h2>


                    <label >
                        Name
                        <input 
                        type= "text"
                        name= "activityNameOne"
                        value={formData.activityNameOne}
                        onChange={handleChange}
                        />
                    </label>

                    <label >
                        Description
                        <textarea
                        name= "descriptionOne"
                        value={formData.descriptionOne}
                        onChange={handleChange}
                        /> 
                    </label>

                    <label >
                        Price
                        <input 
                        type= "number"
                        name= "priceOne"
                        value={formData.priceOne}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Location
                        <input 
                        type= "text"
                        name= "locationOne"
                        value={formData.locationOne}
                        onChange={handleChange}
                        />
                    </label>  
                </div>
                                                         
                <div className="gridDiv">
                    <h2> Activity B</h2>
                    <label>
                        Name
                        <input 
                        type= "text"
                        name= "activityNameTwo"
                        value={formData.activityNameTwo}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                        name= "descriptionTwo"
                        value={formData.descriptionTwo}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Price
                        <input 
                        type= "number"
                        name= "priceTwo"
                        value={formData.priceTwo}
                        onChange={handleChange}
                        />
                    </label>

                    <label>
                        Location
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
