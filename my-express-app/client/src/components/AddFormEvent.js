import React, { useState } from "react";


const INIT_STATE = {
    "main": {
        date: '',
        title: '',
        deadline: '',

        "activityOne": {
            activityName: '',
            description: '',
            price: '',
            link: '',
            location: ''
        },
        "activityTwo": {
            activityName: '',
            description: '',
            price: '',
            link: '',
            location: ''
        }  
    }
}


function AddFormEvent(props) {
    const [formData, setFormData] = useState(INIT_STATE)

    function handleSubmit(event) {
        event.preventDefault();
        props.addEventFormCb(formData);
        setFormData(INIT_STATE);
        // console.log("something has been submitted")
    }

    function handleChange(event) {
        let { name, value } = event.target;
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
                    value={formData.main.date}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Title
                    <input 
                    type= "text"
                    name= "title"
                    value={formData.main.title}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Due date
                    <input 
                    type= "text"
                    name= "deadline"
                    value={formData.main.deadline}
                    onChange={handleChange}
                    />
                </label>

                <h1>Activity info</h1>
                <h2> FIRST</h2>
                {/* for loop */}

                <label>
                    Name
                    <input 
                    type= "text"
                    name= "activityName"
                    value={formData.main.activityOne.activityName}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Description
                    <input 
                    type= "text"
                    name= "description"
                    value={formData.main.activityOne.description}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Price
                    <input 
                    type= "number"
                    name= "price"
                    value={formData.main.activityOne.price}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Link
                    <input 
                    type= "link"
                    name= "link"
                    value={formData.main.activityOne.link}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Location
                    <input 
                    type= "text"
                    name= "location"
                    value={formData.main.activityOne.location}
                    onChange={handleChange}
                    />
                </label>                                                            

                <h2> SECOND</h2>
                <label>
                    Name
                    <input 
                    type= "text"
                    name= "activityName"
                    value={formData.main.activityTwo.activityName}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Description
                    <input 
                    type= "text"
                    name= "description"
                    value={formData.main.activityTwo.description}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Price
                    <input 
                    type= "number"
                    name= "price"
                    value={formData.main.activityTwo.price}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Link
                    <input 
                    type= "link"
                    name= "link"
                    value={formData.main.activityTwo.link}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Location
                    <input 
                    type= "text"
                    name= "location"
                    value={formData.main.activityTwo.location}
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