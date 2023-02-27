import React, { useState } from "react";


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
    locationTwo: ''
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
                <h1>Main info</h1>
                <label>
                    Date
                    <input 
                    type= "text"
                    name= "date"
                    value={formData.date}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Title
                    <input 
                    type= "text"
                    name= "title"
                    value={formData.title}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Due date
                    <input 
                    type= "text"
                    name= "deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    />
                </label>

                <h1>Activity info</h1>
                <h2> FIRST</h2>


                <label>
                    Name
                    <input 
                    type= "text"
                    name= "activityNameOne"
                    value={formData.activityNameOne}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Description
                    <textarea
                    name= "descriptionOne"
                    value={formData.descriptionOne}
                    onChange={handleChange}
                    /> 
                </label>

                <label>
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

                <h2> SECOND</h2>
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

                <div>
                    <button type="submit">Submit</button>
                </div>

            </form>
        </div>
    );
}

export default AddFormEvent;