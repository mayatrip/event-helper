
-- (Re)create the table
DROP TABLE IF EXISTS keyInfo;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS votes;


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

CREATE TABLE votes (
        votes_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        count INT NOT NULL,
        activities_id INT NOT NULL
);


    