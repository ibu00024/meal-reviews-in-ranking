CREATE DATABASE IF NOT EXISTS MealReview;
USE MealReview

CREATE TABLE IF NOT EXISTS restaurant
(
    restaurant_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    location VARCHAR(255),
    PRIMARY KEY (restaurant_id)
);

CREATE TABLE IF NOT EXISTS category
(
    category_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (category_id)
);

CREATE TABLE IF NOT EXISTS review
(
    review_id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    reviewer_name VARCHAR(255),
    rating INTEGER,
    price INTEGER,
    comment TEXT,
    picture_url TEXT,
    restaurant_id INTEGER,
    CONSTRAINT fk_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    category_id INTEGER,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(category_id),
    PRIMARY KEY (review_id)
);