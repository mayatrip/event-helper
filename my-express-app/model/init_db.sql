
-- (Re)create the table
DROP TABLE if exists event; 


CREATE TABLE event(id INT NOT NULL AUTO_INCREMENT, date VARCHAR(50) NOT NULL, title VARCHAR(50) NOT NULL, deadline VARCHAR(50) NOT NULL, activityName VARCHAR(50) NOT NULL, description VARCHAR(100) NOT NULL, price INT NOT NULL, link VARCHAR(500), location VARCHAR(50) NOT NULL, PRIMARY KEY(id));";