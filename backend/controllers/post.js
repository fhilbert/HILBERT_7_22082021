const db = require("../models");
const fs = require("fs");

exports.createPost = (req, res, next) => {
	console.log("--------");
	console.log("createPost");
	const newPost = {
		content: req.body.content,
		image: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null,
		UserId: req.body.UserId,
	};
	// console.log(newPost);

	db.Post.create(newPost)
		.then(post => {
			db.Post.findOne({ include: db.User, where: { id: post.id } })
				.then(postuser => {
					return res.status(201).json(postuser);
				})
				.catch(error => res.status(404).json({ error }));
		})
		.catch(error => res.status(400).json({ message: error.message }));
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
	db.Post.findAll({ include: db.User, order: [["createdAt", "DESC"]] })
		.then(posts => res.status(200).json(posts))
		.catch(error => console.log(error));
};

exports.deletePost = async (req, res, next) => {
	console.log("--------");
	console.log("deletePost");
	console.log(req.params.id);

	db.Post.findOne({ where: { id: req.params.id } })
		.then(post => {
			// console.log(post.image);

			if (post.image) {
				console.log(post.image.split("/images/")[1]);
				const filename = post.image.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					post
						.destroy()
						.then(() => res.status(200).json({ message: "Objet supprimé !" }))
						.catch(error => res.status(400).json({ message: error.message }));
				});
			} else {
				post
					.destroy()
					.then(() => res.status(200).json({ message: "Objet supprimé !" }))
					.catch(error => res.status(400).json({ message: error.message }));
			}
		})
		.catch(error => res.status(500).json({ message: error.message }));
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
		.then(comment => {
			console.log("COMMENT");
			console.log(comment);

			db.Comment.findOne({ include: db.User, where: { id: comment.id } })
				.then(commentuser => {
					return res.status(201).json(commentuser);
				})
				.catch(error => res.status(404).json({ error }));
		})
		.catch(error => res.status(400).json({ message: error.message }));
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

	db.Comment.findAll({ include: db.User, where: { PostId: req.params.id } })
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
		.then(() => res.status(201).json(newLike))
		.catch(error => res.status(400).json({ message: error.message }));
};
exports.getOneLike = (req, res, next) => {
	console.log("--------");
	console.log("getOneLike");

	db.Like.findOne({ where: { Postid: req.params.id } })
		.then(like => {
			res.status(200).json(like);
		})
		.catch(error => res.status(404).json({ message: error.message }));
};

exports.getAllLikes = (req, res, next) => {
	console.log("--------");
	console.log("getAllLikes");

	db.Post.findOne({ include: db.Like, where: { id: req.params.id } })
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
exports.updateOneLike = (req, res, next) => {
	console.log("updateOneLike");
	db.Like.findOne({ where: { id: req.params.id } })
		.then(like => {
			console.log(req.body);

			like.valeur = req.body.valeur;

			like
				.save()
				.then(() => res.status(200).json({ message: "Updated like" }))
				.catch(error => res.status(400).json({ message: error.message }));
		})
		.catch(error => res.status(500).json({ message: error.message }));
};
