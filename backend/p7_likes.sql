USE groupomania_dev;

INSERT INTO `groupomania_dev`.`Likes` (`id`, `PostId` ,`UserId`, `valeur`) 
VALUES 
('1', '1','1', '1'),
('2', '1','2', '1'),
('3', '1','3', '1'),
('4', '2','3', '1'),
('5', '3','1', '1'),
('6', '3','2', '1'),
('7', '4','1', '1'),
('8', '4','3', '1'),
('9', '5','1', '1'),
('10','6','1','1')
;


DELETE FROM Likes WHERE idUsers=5 ;
DELETE FROM Likes ;

SELECT * FROM Likes;

DROP TABLE Likes;
