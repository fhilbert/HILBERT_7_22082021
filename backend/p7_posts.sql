USE groupomania_dev;

INSERT INTO `groupomania_dev`.`Posts` (`id`, `idUsers`, `content`, `image`) 
VALUES 
('1', '1', 'content1', 'photo1'),
('2', '2', 'content2', 'photo2'),
('3', '3', 'content3', 'photo3'),
('4', '1', 'content4', 'photo4'),
('5', '2', 'content5', 'photo'),
('6', '2', 'content62', 'phot'),
('7', '2', 'content22', 'photo2444'),
('8', '2', 'content8', 'photo2112'),
('9', '2', 'content9', 'photo28888'),
('10', '2', 'content10', 'photo27')
;


DELETE FROM Posts WHERE idUsers=5 ;
DELETE FROM Posts ;

SELECT * FROM Posts;

DROP TABLE Posts;
