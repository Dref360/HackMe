CREATE DATABASE hackme;
USE hackme;
CREATE TABLE users
(
	username varchar(32) NOT NULL,
    encryptedPassword varchar(32) NOT NULL
);
INSERT INTO users
	VALUES('dtrump69', '29098cb71f411119141c19'),
		  ('master420', '390bb898016e0e163c0f3f8e290a1983');
    