DROP DATABASE IF EXISTS flashcards_db;

CREATE DATABASE flashcards_db;

USE flashcards_db;

CREATE TABLE cards (
  id int AUTO_INCREMENT NOT NULL,
  term varchar(200) NOT NULL,
  def varchar(200) NOT NULL,
  PRIMARY KEY(id)
);