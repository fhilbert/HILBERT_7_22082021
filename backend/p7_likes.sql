USE groupomania_dev;

INSERT INTO `groupomania_dev`.`Likes` (`id`, `idPosts`,`idUsers`, `valeur`) 
VALUES 
('1', '1','1', '1'),
('2', '1','2', '1'),
('3', '2','2', '1'),
('4', '2','3', '0'),
('5', '3','1', '1'),
('6', '3','2', '0'),
('7', '4','1', '1'),
('8', '4','3', '1'),
('9', '5','1', '0'),
('10','6','1','1')
;


DELETE FROM Likes WHERE idUsers=5 ;
DELETE FROM Likes ;

SELECT * FROM Likes;

DROP TABLE Likes;
