--  mysql -u root -p  


INSERT INTO `groupomania_dev`.`Users` (`id`, `email`, `lastName`, `firstName`, `password`, `bio`, `isAdmin`) 
VALUES 
('1', 'frank1@gmail.com', 'hilbert', 'tom', '1234', 'bio1', '0'),
('2', 'frank2@gmail.com', 'hilbert', 'frank', '1234', 'bio2', '1'),
('3', 'frank3@gmail.com', 'hilbert', 'catherine', '1234', 'bio3', '0')
;
DELETE FROM Users WHERE id=5 ;
DELETE FROM Users ;

SELECT * FROM Users;

DROP TABLE Users;
