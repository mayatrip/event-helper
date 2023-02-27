import React from 'react';


function ActivitiesInput() {

  return (
    <div>
        <label>
            Name
            <input 
            type= "text"
            name= "activityName"
            value={formData.activityName}
            onChange={handleChange.activityOne}
            />
        </label>

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
        </label>

        <label>
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
        </label>  
    </div>           
  );
}

export default ActivitiesInput;
