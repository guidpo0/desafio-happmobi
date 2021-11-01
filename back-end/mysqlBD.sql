CREATE DATABASE IF NOT EXISTS `happmobi`;

DROP TABLE IF EXISTS `happmobi`.`Rents`;
DROP TABLE IF EXISTS `happmobi`.`Users`;
DROP TABLE IF EXISTS `happmobi`.`Address`;
DROP TABLE IF EXISTS `happmobi`.`Cars`;

CREATE TABLE IF NOT EXISTS happmobi.Address (
  address_id INT PRIMARY KEY AUTO_INCREMENT,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  zip VARCHAR(50) NOT NULL
);

INSERT INTO happmobi.Address(street, city, zip) VALUES
  ('Rua 03 de Outubro', 'São Paulo', '08090-284'),
  ('Rua 13 de Maio', 'São Paulo', '04849-529'),
  ('Rua 21 de Abril', 'São Paulo', '03047-000'),
  ('Rua 21 de Setembro', 'São Paulo', '03807-020'),
  ('Rua Abraham Lincoln', 'São Paulo', '05123-000'),
  ('Rua Abreu Lemos', 'São Paulo', '02338-030');

CREATE TABLE IF NOT EXISTS happmobi.Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  user_email VARCHAR(50) NOT NULL,
  user_password VARCHAR(50) NOT NULL,
  user_role VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address_id INT NOT NULL,
  FOREIGN KEY (address_id) REFERENCES Address(address_id)
);

INSERT INTO happmobi.Users(user_email, user_password, user_role, first_name, last_name, phone, address_id) VALUES
  ('claudio@teste.com', 'claudioteste', 'admin', 'Claudio', 'Teste', '11 99999-9999',
  (SELECT address_id FROM happmobi.Address WHERE zip = '08090-284')),
  ('joana@teste.com', 'joanateste', 'user', 'Joana', 'Teste', '11 99999-9999',
  (SELECT address_id FROM happmobi.Address WHERE zip = '04849-529')),
  ('bernardo@teste.com', 'bernardoteste', 'user', 'Bernardo', 'Teste', '11 99999-9999',
  (SELECT address_id FROM happmobi.Address WHERE zip = '03047-000')),
  ('maria@teste.com', 'mariateste', 'user', 'Maria', 'Teste', '11 99999-9999',
  (SELECT address_id FROM happmobi.Address WHERE zip = '03807-020')),
  ('antonio@teste.com', 'antonioteste', 'user', 'Antonio', 'Teste', '11 99999-9999',
  (SELECT address_id FROM happmobi.Address WHERE zip = '05123-000')),
  ('roberta@teste.com', 'robertateste', 'user', 'Roberta', 'Teste', '11 99999-9999',
  (SELECT address_id FROM happmobi.Address WHERE zip = '02338-030'));

CREATE TABLE IF NOT EXISTS happmobi.Cars (
  car_id INT PRIMARY KEY AUTO_INCREMENT,
  car_model VARCHAR(50) NOT NULL,
  cost_hour FLOAT NOT NULL,
  rent_available BOOLEAN NOT NULL
);

INSERT INTO happmobi.Cars(car_model, cost_hour, rent_available) VALUES
  ('Mini Cooper Cabrio 2.0', 43.36, true),
  ('T-Cross 1.0 Turbo', 19.45, true),
  ('Renegade 1.8', 19.54, true),
  ('Virtus 1.0 Turbo', 17.78, true),
  ('Polo MSI 1.6', 13.45, true),
  ('HB20 1.6', 13.89, true);

CREATE TABLE IF NOT EXISTS happmobi.Rents (
  rent_id INT PRIMARY KEY AUTO_INCREMENT,
  car_id INT NOT NULL,
  user_id INT NOT NULL,
  rent_start DATETIME NOT NULL,
  rent_end DATETIME NOT NULL,
  total FLOAT NOT NULL,
  FOREIGN KEY (car_id) REFERENCES Cars(car_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO happmobi.Rents(car_id, user_id, rent_start, rent_end, total) VALUES
  (
    (SELECT car_id FROM happmobi.Cars WHERE car_model = 'T-Cross 1.0 Turbo'),
    (SELECT user_id FROM happmobi.Users WHERE first_name = 'Joana'),
    '2021-10-28 10:00:00',
    '2021-10-30 21:00:00',
    HOUR(TIMEDIFF(rent_end, rent_start)) * (SELECT cost_hour FROM happmobi.Cars WHERE car_model = 'T-Cross 1.0 Turbo')
  ),
  (
    (SELECT car_id FROM happmobi.Cars WHERE car_model = 'Renegade 1.8'),
    (SELECT user_id FROM happmobi.Users WHERE first_name = 'Bernardo'),
    '2021-10-28 10:00:00',
    '2021-10-30 21:00:00',
    HOUR(TIMEDIFF(rent_end, rent_start)) * (SELECT cost_hour FROM happmobi.Cars WHERE car_model = 'Renegade 1.8')
  ),
  (
    (SELECT car_id FROM happmobi.Cars WHERE car_model = 'Virtus 1.0 Turbo'),
    (SELECT user_id FROM happmobi.Users WHERE first_name = 'Maria'),
    '2021-10-28 10:00:00',
    '2021-10-30 21:00:00',
    HOUR(TIMEDIFF(rent_end, rent_start)) * (SELECT cost_hour FROM happmobi.Cars WHERE car_model = 'Virtus 1.0 Turbo')
  ),
  (
    (SELECT car_id FROM happmobi.Cars WHERE car_model = 'HB20 1.6'),
    (SELECT user_id FROM happmobi.Users WHERE first_name = 'Antonio'),
    '2021-10-28 10:00:00',
    '2021-10-30 21:00:00',
    HOUR(TIMEDIFF(rent_end, rent_start)) * (SELECT cost_hour FROM happmobi.Cars WHERE car_model = 'HB20 1.6')
  ),
  (
    (SELECT car_id FROM happmobi.Cars WHERE car_model = 'Polo MSI 1.6'),
    (SELECT user_id FROM happmobi.Users WHERE first_name = 'Roberta'),
    '2021-10-28 10:00:00',
    '2021-10-30 21:00:00',
    HOUR(TIMEDIFF(rent_end, rent_start)) * (SELECT cost_hour FROM happmobi.Cars WHERE car_model = 'Polo MSI 1.6')
  );
   