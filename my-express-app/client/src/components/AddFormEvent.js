import React, { useState } from "react";

const INIT_FORM = {
    date: '',
    title: '',
    deadline: '',
    activityName: '',
    description: '',
    price: '',
    link: '',
    location: '',
}

function AddFormEvent() {
    let [formData, setFormData] = useState[INIT_FORM];

    function handleChange(event) {
        let {name, value} = event.target;
        setFormData = (data => ({
            ...data,
            [name]: value,
        }));
        
    }

    return (
        <div>
            <form>
                <label>
                    Date
                    <input 
                    type= "text"
                    name= "date"
                    value={formData.date}
                    onChange={handleChange}
                    />
                </label>



            </form>
        </div>

    );
}

export default AddFormEvent;