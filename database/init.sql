CREATE DATABASE IF NOT EXISTS MealReview;
USE MealReview

CREATE TABLE IF NOT EXISTS Restaurant
(
    RestaurantID INTEGER NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255),
    Location VARCHAR(255),
    PRIMARY KEY (RestaurantID)
);

CREATE TABLE IF NOT EXISTS Category
(
    CategoryID INTEGER NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255),
    PRIMARY KEY (CategoryID)
);

CREATE TABLE IF NOT EXISTS Review
(
    ReviewID INTEGER NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255),
    ReviewerName VARCHAR(255),
    Rating INTEGER,
    Price INTEGER,
    Comment TEXT,
    PictureURL TEXT,
    RestaurantID INTEGER,
    CONSTRAINT fk_restaurant FOREIGN KEY (RestaurantID) REFERENCES Restaurant(RestaurantID),
    CategoryID INTEGER,
    CONSTRAINT fk_category FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID),
    PRIMARY KEY (ReviewID)
);