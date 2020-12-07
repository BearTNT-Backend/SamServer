\c listdb

CREATE TABLE IF NOT EXISTS ratings (
  ratings_id bigserial,
  average VARCHAR (4) NOT NULL,
  cleanliness VARCHAR (4) NOT NULL,
  communication VARCHAR (4) NOT NULL,
  checkin VARCHAR (4) NOT NULL,
  location VARCHAR (4) NOT NULL,
  value VARCHAR (4) NOT NULL,
  PRIMARY KEY (ratings_id)
);

CREATE TABLE IF NOT EXISTS reviews (
  reviews_id bigserial,
  name VARCHAR (30) NOT NULL,
  date VARCHAR (30) NOT NULL,
  reviewBody VARCHAR (1000) NOT NULL,
  profilePic VARCHAR (200),
  ratings_id BIGINT,
  PRIMARY KEY (reviews_id),
  FOREIGN KEY (ratings_id) REFERENCES ratings(ratings_id)
);
    -- ON DELETE CASCADE
    -- [ ON UPDATE { NO ACTION | CASCADE | SET NULL | SET DEFAULT} ] -- DOES THIS WORK?

-- INSERT INTO ratings (cleanliness, communication, checkin, accuracy, location, value) VALUES (4.4, 3.6, 2.4, 5.0, 3.4, 2.2);
-- INSERT INTO reviews (name, date, reviewBody, profilePic, ratings_id) VALUES ('sally', 'OCT 2020', 'It was sooo good', 'url.com', 1);
-- INSERT INTO reviews (name, date, reviewBody, profilePic, ratings_id) VALUES ('jim', 'OCT 2020', 'It was ok', 'url.com', 1);

-- TO SEED THE DATABASE
  -- cd into the Customer-Reviews-Service folder
  -- run the code: mysql -u sammy < database/schema.sql

-- TO VIEW THE WHOLE DATABASE BY LISTING
  -- run in the terminal:
  -- mysql -u sammy
  -- USE beartnt_reviews
  -- SELECT * FROM ratings
  -- INNER JOIN reviews
  -- ON reviews.ratings_id = ratings.ratings_id;
