--Create database
DROP DATABASE IF EXISTS event;
CREATE DATABASE event;
USE event;


-- (Re)create the table

CREATE TABLE keyInfo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    date VARCHAR(50) NOT NULL, 
    title VARCHAR(50) NOT NULL, 
    deadline VARCHAR(50) NOT NULL,
    keyInfo_id INT NOT NULL
);

CREATE TABLE activities (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        activityName VARCHAR(50) NOT NULL, 
        description VARCHAR(100) NOT NULL, 
        price INT NOT NULL, 
        link VARCHAR(500), 
        location VARCHAR(50) NOT NULL, 
        keyInfo_id INT NOT NULL,
        FOREIGN KEY (keyInfo_id) REFERENCES keyInfo(id)
);

    
