import React, { useState } from "react";


const INIT_STATE = {
    "keyInfo": {
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
                    value={formData.keyInfo.date}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Title
                    <input 
                    type= "text"
                    name= "title"
                    value={formData.keyInfo.title}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Due date
                    <input 
                    type= "text"
                    name= "deadline"
                    value={formData.keyInfo.deadline}
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
                    value={formData.keyInfo.activityOne.activityName}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Description
                    <input 
                    type= "text"
                    name= "description"
                    value={formData.keyInfo.activityOne.description}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Price
                    <input 
                    type= "number"
                    name= "price"
                    value={formData.keyInfo.activityOne.price}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Link
                    <input 
                    type= "link"
                    name= "link"
                    value={formData.keyInfo.activityOne.link}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Location
                    <input 
                    type= "text"
                    name= "location"
                    value={formData.keyInfo.activityOne.location}
                    onChange={handleChange}
                    />
                </label>                                                            

                <h2> SECOND</h2>
                <label>
                    Name
                    <input 
                    type= "text"
                    name= "activityName"
                    value={formData.keyInfo.activityTwo.activityName}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Description
                    <input 
                    type= "text"
                    name= "description"
                    value={formData.keyInfo.activityTwo.description}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Price
                    <input 
                    type= "number"
                    name= "price"
                    value={formData.keyInfo.activityTwo.price}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Link
                    <input 
                    type= "link"
                    name= "link"
                    value={formData.keyInfo.activityTwo.link}
                    onChange={handleChange}
                    />
                </label>

                <label>
                    Location
                    <input 
                    type= "text"
                    name= "location"
                    value={formData.keyInfo.activityTwo.location}
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