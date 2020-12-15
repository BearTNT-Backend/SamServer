\c listdb

CREATE TABLE IF NOT EXISTS ratings (
  ratingsId bigserial,
  average VARCHAR (3) NOT NULL,
  cleanliness VARCHAR (3) NOT NULL,
  communication VARCHAR (3) NOT NULL,
  checkin VARCHAR (3) NOT NULL,
  accuracy VARCHAR (3) NOT NULL,
  location VARCHAR (3) NOT NULL,
  value VARCHAR (3) NOT NULL,
  PRIMARY KEY (ratingsId)
);

CREATE TABLE IF NOT EXISTS reviews (
  reviewsId bigserial,
  listingId bigserial,
  imageid INT,
  name VARCHAR (22) NOT NULL,
  date VARCHAR (30) NOT NULL,
  reviewBody VARCHAR (280) NOT NULL,
  ratingsId BIGINT,
  PRIMARY KEY (reviewsId),
  FOREIGN KEY (ratingsId) REFERENCES ratings(ratingsId),
  FOREIGN KEY (imageid) REFERENCES pictures(imageid)
);

CREATE TABLE IF NOT EXISTS pictures (
  imageid serial,
  profilePic VARCHAR (115),
  PRIMARY KEY (imageid)
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
