const db = require("../models");

exports.createPost = (req, res, next) => {
	console.log("--------");
	console.log("createPost");
	console.log(req.body);

	const newPost = {
		content: req.body.content,
		image: req.body.image,
		UserId: req.body.UserId,
	};
	db.Post.create(newPost)
		.then(() => res.status(201).json({ message: "post crée !" }))
		.catch(error => res.status(400).json({ error }));

	res.json(newPost);
};

exports.getOnePost = (req, res, next) => {
	console.log("--------");
	console.log("get_OnePost");

	db.Post.findOne({ where: { id: req.params.id } })
		.then(post => {
			res.status(200).json(post);
		})
		.catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
	console.log("--------");
	console.log("getAllPosts");
	db.Post.findAll({ include: db.User })
		.then(posts => res.status(200).json(posts))
		.catch(error => console.log(error));
};

exports.deletePost = async (req, res, next) => {
	console.log("--------");
	console.log("deletePost");
	console.log(req.params.id);
	await db.Post.destroy({ where: { id: req.params.id } })
		.then(() => res.status(200).json({ message: "Objet supprimé !" }))
		.catch(error => res.status(400).json({ error }));

	db.Post.findOne({ where: { id: req.params.id } })
		.then(post => {
			//console.log(post);

			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				db.Post.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: "Objet supprimé !" }))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.status(500).json({ error }));
};

//----------------
// Comments
//----------------
exports.createComment = (req, res, next) => {
	console.log("--------");
	console.log("createComment");
	const newComment = {
		comment: req.body.comment,
		PostId: req.body.PostId,
		UserId: req.body.UserId,
	};
	db.Comment.create(newComment)
		.then(() => res.status(201).json({ message: "Comment crée !" }))
		.catch(error => res.status(400).json({ error }));

	res.json(newComment);
};

exports.getOneComment = (req, res, next) => {
	console.log("--------");
	console.log("getOneComment");

	db.Comment.findOne({ where: { id: req.params.id } })
		.then(comment => {
			res.status(200).json(comment);
		})
		.catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res, next) => {
	console.log("--------");
	console.log("getAllComments");

	db.Comment.findAll()
		.then(comment => res.status(200).json(comment))
		.catch(error => console.log(error));
};
exports.deleteComment = async (req, res, next) => {
	console.log("--------");
	console.log("deleteComment");
	console.log(req.params.id);
	await db.Comment.destroy({ where: { id: req.params.id } })
		.then(() => res.status(200).json({ message: "Objet supprimé !" }))
		.catch(error => res.status(400).json({ error }));
};

//----------------
// Likes
//----------------
exports.createLike = (req, res, next) => {
	console.log("--------");
	console.log("createLike");
	const newLike = {
		valeur: req.body.valeur,
		PostId: req.body.PostId,
		UserId: req.body.UserId,
	};
	console.log(req.body);
	console.log(newLike);
	db.Like.create(newLike)
		.then(() => res.status(201).json({ message: "Like crée !" }))
		.catch(error => res.status(400).json({ error }));

	res.json(newLike);
};
exports.getOneLike = (req, res, next) => {
	console.log("--------");
	console.log("getOneLike");

	db.Like.findOne({ where: { id: req.params.id } })
		.then(like => {
			res.status(200).json(like);
		})
		.catch(error => res.status(404).json({ error }));
};

exports.getAllLikes = (req, res, next) => {
	console.log("--------");
	console.log("getAllLikes");

	db.Like.findAll()
		.then(like => res.status(200).json(like))
		.catch(error => console.log(error));
};
exports.deleteLike = async (req, res, next) => {
	console.log("--------");
	console.log("deleteLike");
	console.log(req.params.id);
	await db.Like.destroy({ where: { id: req.params.id } })
		.then(() => res.status(200).json({ message: "Objet supprimé !" }))
		.catch(error => res.status(400).json({ error }));
};

// ----------------
