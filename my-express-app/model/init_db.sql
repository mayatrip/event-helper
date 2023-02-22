-- (Re)create the table

DROP TABLE IF EXISTS event;
CREATE TABLE event (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    deadline VARCHAR(50) NOT NULL,
    activityName VARCHAR(50) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    link VARCHAR(65535),
    location VARCHAR(50)
);

-- Insert some sample data

INSERT INTO event (id, date, title, deadline, activityName, description, price, link, location)
VALUES
    ("Friday 28th April", "esquilo birthday", "Monday 30th April", "mini gold", "like gold but everything is smaller so you look like a giant", "price": 15, "https://swingers.club/uk/venues/city?utm_source=google&utm_medium=organic&utm_campaign=gmb&utm_content=city", "London city"),

    ("Friday 15th June", "jelly birthday", "Saturday 8th June", "bbq", "the annual olympic game special jelly", "price": 20, "https://mcdonalds.vn/menu/20-chicken-mcnuggets%E2%84%A2-12.html", "greenpark");