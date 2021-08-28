

INSERT INTO `groupomania_dev`.`Comments` (`id`, `idUsers`, `idPosts`, `comment`) 
VALUES 
('1', '1','2', 'content1'),
('2', '2','1', 'content2'),
('3', '3','2', 'content3'),
('4', '1','3', 'content4'),
('5', '2','3', 'content5'),
('6', '2','2', 'content62'),
('7', '2','6', 'content22'),
('8', '2','6', 'content8'),
('9', '2','6', 'content9'),
('10', '2','4', 'content10')
;


DELETE FROM Posts WHERE id=3 ;
DELETE FROM Comments ;

SELECT * FROM Posts ORDER BY id;
SELECT * FROM Comments ORDER BY idPosts;
SELECT * FROM Likes ORDER BY idPosts;

DROP TABLE Comments;
