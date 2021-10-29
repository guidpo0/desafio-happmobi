CREATE DATABASE IF NOT EXISTS `heroku_5eb1b5a5878e473`;

CREATE TABLE IF NOT EXISTS heroku_5eb1b5a5878e473.Districts (
  district_id INT PRIMARY KEY AUTO_INCREMENT,
  district_name VARCHAR(50) NOT NULL,
  state VARCHAR(2) NOT NULL
);

INSERT INTO heroku_5eb1b5a5878e473.Districts(district_name, state) VALUES
  ('Copacabana', 'RJ'),
  ('Leblon', 'RJ'),
  ('Ipanema', 'RJ'),
  ('Barra da Tijuca', 'RJ');

CREATE TABLE IF NOT EXISTS heroku_5eb1b5a5878e473.Dates (
  date_id INT PRIMARY KEY AUTO_INCREMENT,
  date_name VARCHAR(5) NOT NULL,
  district_id INT NOT NULL,
  FOREIGN KEY (district_id) REFERENCES Districts(district_id)
);

INSERT INTO heroku_5eb1b5a5878e473.Dates(date_name, district_id) VALUES
  ('25/11', 5),
  ('25/11', 15),
  ('25/11', 25),
  ('25/11', 35),
  ('26/11', 5),
  ('26/11', 15),
  ('26/11', 25),
  ('26/11', 35);

CREATE TABLE IF NOT EXISTS heroku_5eb1b5a5878e473.Climates (
  climate_id INT PRIMARY KEY AUTO_INCREMENT,
  climate_hour INT NOT NULL,
  climate_rain FLOAT NOT NULL,
  date_id INT NOT NULL,
  FOREIGN KEY (date_id) REFERENCES Dates(date_id)
);

INSERT INTO heroku_5eb1b5a5878e473.Climates(climate_hour, climate_rain, date_id) VALUES
  (0, 0.1, 85),
  (3, 5.2, 85),
  (6, 7.8, 85),
  (9, 12.9, 85),
  (12, 18.7, 85),
  (15, 38.1, 85),
  (18, 2.3, 85),
  (21, 1, 85),
	(0, 0.1,95),
  (3, 5.2,95),
  (6, 7.8,95),
  (9, 12.9,95),
  (12, 18.7,95),
  (15, 38.1,95),
  (18,2.3,95),
  (21, 1,95),
  (0, 0.1,105),
  (3, 5.2,105),
  (6, 7.8,105),
  (9, 12.9,105),
  (12, 18.7,105),
  (15,38.1,105),
  (18, 2.3,105),
  (21, 1,105),
	(0, 0.1,115),
  (3, 5.2,115),
  (6, 7.8,115),
  (9, 12.9,115),
  (12, 18.7,115),
  (15, 38.1,115),
  (18, 2.3,115),
  (21, 1,115),
  (0, 0.1, 125),
  (3, 5.2, 125),
  (6, 7.8, 125),
  (9, 12.9, 125),
  (12, 18.7, 125),
  (15, 38.1, 125),
  (18, 2.3, 125),
  (21, 1, 125),
  (0, 0.1, 135),
  (3, 5.2, 135),
  (6, 7.8, 135),
  (9, 12.9, 135),
  (12, 18.7, 135),
  (15, 38.1, 135),
  (18, 2.3, 135),
  (21, 1, 135),
  (0, 0.1, 145),
  (3, 5.2, 145),
  (6, 7.8, 145),
  (9, 12.9, 145),
  (12, 18.7, 145),
  (15, 38.1, 145),
  (18, 2.3, 145),
  (21, 1, 145),
  (0, 0.1, 155),
  (3, 5.2, 155),
  (6, 7.8, 155),
  (9, 12.9, 155),
  (12, 18.7, 155),
  (15, 38.1, 155),
  (18, 2.3, 155),
  (21, 1, 155);
   