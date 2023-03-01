import React, { useState } from "react";
import './AddFormEvent.css';

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
    const [formData, setFormData] = useState(INIT_STATE)


    function handleSubmit(event) {
        event.preventDefault();
        props.addEventFormCb(formData);
        setFormData(INIT_STATE);
        console.log("something has been submitted for real")
    }

    function handleChange(event) {
        let {name, value} = event.target;
        setFormData (data => ({
                ...data,
                [name]: value,
        }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div className="gridDiv">
                    <h2>Main info</h2>
                        <label class="col-sm" >
                            Date
                            <input 
                            type= "text"
                            name= "date"
                            value={formData.date}
                            onChange={handleChange}
                            />
                        </label>
   

                    <label class="col-sm">
                        Title
                        <input 
                        type= "text"
                        name= "title"
                        value={formData.title}
                        onChange={handleChange}
                        />
                    </label>

                    <label class="col-sm">
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