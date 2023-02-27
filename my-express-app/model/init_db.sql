
-- (Re)create the table

CREATE TABLE keyInfo (
    keyInfo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    date VARCHAR(50) NOT NULL, 
    title VARCHAR(50) NOT NULL, 
    deadline VARCHAR(50) NOT NULL,
    keySource_id INT NOT NULL
);

CREATE TABLE activities (
        activities_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        activityName VARCHAR(50) NOT NULL, 
        description VARCHAR(100) NOT NULL, 
        price INT NOT NULL, 
        link VARCHAR(500), 
        location VARCHAR(50) NOT NULL, 
        keyInfo_id INT NOT NULL,
        keySource_id INT NOT NULL
);

CREATE TABLE keySource (
    keySource_id INT id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    keyInfo_id INT NOT NULL,
    activities_Id INT NOT NULL


)

-- TABLE DE JOINTURE



    