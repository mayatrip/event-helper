
-- (Re)create the table

CREATE TABLE keyInfo (
    keyInfo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    date VARCHAR(50) NOT NULL, 
    title VARCHAR(50) NOT NULL, 
    deadline VARCHAR(50) NOT NULL
);

CREATE TABLE activities (
        activities_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        activityName VARCHAR(50) NOT NULL, 
        description TEXT NOT NULL, 
        price INT NOT NULL, 
        location VARCHAR(50) NOT NULL, 
        keyInfo_id INT NOT NULL
);




    