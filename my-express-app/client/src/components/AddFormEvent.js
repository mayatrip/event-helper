import React, { useState } from "react";


const INIT_STATE = {
    "keyInfo": {
        date: '',
        title: '',
        deadline: '',

        "activityOne": {
            activityName: '',
            description: '',
            price: 0,
            link: '',
            location: ''
        },
        "activityTwo": {
            activityNameTwo: '',
            descriptionTwo: '',
            priceTwo: 0,
            linkTwo: '',
            locationTwo: ''
        },
    }
}


function AddFormEvent(props) {
    const [formData, setFormData] = useState(INIT_STATE)


    function handleSubmit(event) {
        event.preventDefault();
        props.addEventFormCb(formData);
        setFormData(INIT_STATE);
        console.log("this is what is in the body:", formData)
    }

    function handleChange(event) {
        let {name, value} = event.target;
        setFormData (data => ({
            ...data,
            activityOne: {
                ...data.activityOne,
            },
            activityTwo: {
                ...data.activityTwo,
            },
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
                    name= "activityName"
                    value={formData.activityName}
                    onChange={handleChange}
                    />
                </label>
{/* 
                <label>
                    Description
                    <input 
                    type= "text"
                    name= "description"
                    value={formData.description}
                    onChange={handleChange.activityOne}
                    />
                </label>

                <label>
                    Price
                    <input 
                    type= "number"
                    name= "price"
                    value={formData.price}
                    onChange={handleChange.activityOne}
                    />
                </label> */}

                {/* <label>
                    Link
                    <input 
                    type= "link"
                    name= "link"
                    value={formData.link}
                    onChange={handleChange.activityOne}
                    />
                </label>

                <label>
                    Location
                    <input 
                    type= "text"
                    name= "location"
                    value={formData.location}
                    onChange={handleChange.activityOne}
                    />
                </label>                                                             */}

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

                {/* <label>
                    Description
                    <input 
                    type= "text"
                    name= "description"
                    value={formData.description}
                    onChange={handleChange.activityTwo}
                    />
                </label>

                <label>
                    Price
                    <input 
                    type= "number"
                    name= "price"
                    value={formData.price}
                    onChange={handleChange.activityTwo}
                    />
                </label>

                <label>
                    Link
                    <input 
                    type= "link"
                    name= "link"
                    value={formData.link}
                    onChange={handleChange.activityTwo}
                    />
                </label>

                <label>
                    Location
                    <input 
                    type= "text"
                    name= "location"
                    value={formData.location}
                    onChange={handleChange.activityTwo}
                    />
                </label>   */}

                <div>
                    <button type="submit">Submit</button>
                </div>

            </form>
        </div>
    );
}

export default AddFormEvent;