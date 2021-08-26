

INSERT INTO `mydb`.`Likes` (`idLikes`, `Posts_idPosts`, `Users_idUsers`) 
VALUES 
('1', '1', '1'),
('2', '2', '2'),
('3', '3', '3'),
('4', '1', '3'),
('5', '2', '1'),
('6', '2', '3'),
('7', '5', '3'),
('8', '6', '2'),
('9', '7', '1'),
('10', '8', '1')
;


DELETE FROM Likes WHERE idUsers=5 ;
DELETE FROM Likes ;

SELECT * FROM Likes;

DROP TABLE Likes;
