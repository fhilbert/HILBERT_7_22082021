--  mysql -u root -p  


INSERT INTO `groupomania_dev`.`Users` (`id`, `email`, `lastName`, `firstName`, `password`, `bio`,`photo`, `isAdmin`) 
VALUES 
('1', 'f@gmail.com', 'Hilbert', 'frank', 'Tr123456', 'bio1','http://localhost:3000/mages/frank.jpeg', '0'),
('2', 'c@gmail.com', 'Hilbert', 'catherine', 'Tr123456', 'bio2','http://localhost:3000/mages/cathy.jpeg', '1'),
('3', 't@gmail.com', 'Hilbert', 'tom', 'Tr123456', 'bio3','http://localhost:3000/mages/tom.jpeg', '1'),
('4', 'd@gmail.com', 'Wawrziczny', 'denis', 'Tr123456', 'bio3','http://localhost:3000/mages/denis.jpeg', '0'),
('5', 'r@gmail.com', 'Wawrziczny', 'rémi', 'Tr123456', 'bio3','http://localhost:3000/mages/remi.jpeg', '0')
;
DELETE FROM Users WHERE id=5 ;
DELETE FROM Users ;

SELECT * FROM Users;

DROP TABLE Users;
