CREATE DATABASE cardatabase;
USE cardatabase;

CREATE TABLE User (
	user_ID INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Car (
	car_ID INT PRIMARY KEY,
	make VARCHAR(255) NOT NULL,
	model VARCHAR(255) NOT NULL,
	year INT NOT NULL,
	body_style VARCHAR(255) NOT NULL,
	price VARCHAR(255),
	MPG VARCHAR(255),
	HP VARCHAR(255),
	engine VARCHAR(255),
	transmission VARCHAR(255),
	weight INT,
	rating DECIMAL(10,2)
);

CREATE TABLE Saved_Car (
	user_ID INT,
	car_ID INT,
	PRIMARY KEY (user_ID, car_ID),
	FOREIGN KEY (user_ID) REFERENCES User(user_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (car_ID) REFERENCES Car(car_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Review (
	review_ID INT AUTO_INCREMENT PRIMARY KEY,
	car_ID INT,
	user_ID INT,
	content TEXT NOT NULL,
	FOREIGN KEY (car_ID) REFERENCES Car(car_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_ID) REFERENCES User(user_ID) ON UPDATE CASCADE ON DELETE CASCADE
); 

CREATE TABLE Review_Like (
	review_ID INT,
	user_ID INT,
	PRIMARY KEY(review_ID, user_ID),
	FOREIGN KEY (review_ID) REFERENCES Review(review_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_ID) REFERENCES User(user_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Review_Dislike (
	review_ID INT,
	user_ID INT,
	PRIMARY KEY(review_ID, user_ID),
	FOREIGN KEY (review_ID) REFERENCES Review(review_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_ID) REFERENCES User(user_ID) ON UPDATE CASCADE ON DELETE CASCADE
);
	

CREATE TABLE Comments (
	comment_ID INT AUTO_INCREMENT PRIMARY KEY,
	review_ID INT,
	user_ID INT,
	textualContent TEXT NOT NULL,
	FOREIGN KEY (user_ID) REFERENCES User(user_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (review_ID) REFERENCES Review(review_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Comment_Like (
	comment_ID INT,
	user_ID INT,
	PRIMARY KEY(comment_ID, user_ID),
	FOREIGN KEY (comment_ID) REFERENCES Comments(comment_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_ID) REFERENCES User(user_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Comment_Dislike (
	comment_ID INT,
	user_ID INT,
	PRIMARY KEY(comment_ID, user_ID),
	FOREIGN KEY (comment_ID) REFERENCES Comments(comment_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (user_ID) REFERENCES User(user_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Photo (
	photo_ID INT PRIMARY KEY,
	car_ID INT,
	image_path VARCHAR(255),
	FOREIGN KEY (car_ID) REFERENCES Car(car_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Car_Has_Photo (
	car_ID INT,
	photo_ID INT,
	PRIMARY KEY (car_ID, photo_ID),
	FOREIGN KEY (car_ID) REFERENCES Car(car_ID) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (photo_ID) REFERENCES Photo(photo_ID) ON UPDATE CASCADE ON DELETE CASCADE
);