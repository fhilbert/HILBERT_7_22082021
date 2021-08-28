const db = require("../models");

exports.createPost = (req, res, next) => {
	const newPost = {
		id: req.body.id,
		idUsers: req.body.idUsers,
		content: req.body.content,
		attachment: req.body.attachment,
	};

	db.Post.create(newPost);

	res.json(newPost);
};

exports.getOnePost = (req, res, next) => {
	console.log("getOnePost");
	console.log("--------");
	console.log(req.params.id);

	db.Post.findOne({ where: { id: req.params.id } })
		.then(post => {
			res.status(200).json(post);
		})
		.catch(error => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
	console.log("getAllPosts");
	db.Post.findAll()
		.then(post => res.status(200).json(post))
		.catch(error => console.log(error));
};

exports.deletePost = async (req, res, next) => {
	console.log("deletePost");
	console.log("--------");
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
exports.getOneComment = (req, res, next) => {
	console.log("getOneComment");

	db.Comment.findOne({ where: { id: req.params.id } })
		.then(comment => {
			res.status(200).json(comment);
		})
		.catch(error => res.status(404).json({ error }));
};

exports.getAllComments = (req, res, next) => {
	console.log("getAllComments");

	db.Comment.findAll()
		.then(comment => res.status(200).json(comment))
		.catch(error => console.log(error));
};
//----------------
// Likes
//----------------
exports.getOneLike = (req, res, next) => {
	db.Like.findOne({ where: { id: req.params.id } })
		.then(like => {
			res.status(200).json(like);
		})
		.catch(error => res.status(404).json({ error }));
};

exports.getAllLikes = (req, res, next) => {
	db.Like.findAll()
		.then(like => res.status(200).json(like))
		.catch(error => console.log(error));
};

// ----------------

// exports.createSauce = (req, res, next) => {
// 	const sauceObject = JSON.parse(req.body.sauce);

// 	delete sauceObject._id;
// 	const sauce = new Sauce({
// 		...sauceObject,
// 		likes: 0,
// 		dislikes: 0,
// 		usersLiked: [],
// 		usersDisliked: [],
// 		imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
// 	});
// 	sauce
// 		.save()
// 		.then(() => res.status(201).json({ message: "Objet crée" }))
// 		.catch(error => res.status(400).json({ error }));
// };

// exports.modifySauce = (req, res, next) => {
// 	if (req.file) {
// 		Sauce.findOne({ _id: req.params.id })
// 			.then(sauce => {
// 				const filename = sauce.imageUrl.split("/images/")[1];
// 				fs.unlink(`images/${filename}`, err => {
// 					if (err) throw err;
// 					console.log("unlink img");
// 				});
// 			})
// 			.catch(error => res.status(500).json({ error }));
// 	}
// 	const sauceObject = req.file
// 		? {
// 				...JSON.parse(req.body.sauce),
// 				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
// 		  }
// 		: { ...req.body };
// 	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
// 		.then(() => res.status(200).json({ message: "Objet modifié ! " }))
// 		.catch(error => res.status(400).json({ error }));
// };

// exports.deleteSauce = (req, res, next) => {
// 	Sauce.findOne({ _id: req.params.id })
// 		.then(sauce => {
// 			const filename = sauce.imageUrl.split("/images/")[1];
// 			fs.unlink(`images/${filename}`, () => {
// 				Sauce.deleteOne({ _id: req.params.id })
// 					.then(() => res.status(200).json({ message: "Objet supprimé !" }))
// 					.catch(error => res.status(400).json({ error }));
// 			});
// 		})
// 		.catch(error => res.status(500).json({ error }));
// };

// exports.getOneSauce = (req, res, next) => {
// 	Sauce.findOne({ _id: req.params.id })
// 		.then(sauce => {
// 			res.status(200).json(sauce);
// 		})
// 		.catch(error => res.status(404).json({ error }));
// };

// exports.getAllSauces = (req, res, next) => {
// 	Sauce.find()
// 		.then(sauce => res.status(200).json(sauce))
// 		.catch(error => console.log(error));
// };
// exports.dealLike = (req, res, next) => {
// 	Sauce.findOne({ _id: req.params.id })
// 		.then(sauce => {
// 			// traitement de la valeur du like

// 			if (req.body.like === 1) {
// 				const isInLike = sauce.usersLiked.includes(req.body.userId);
// 				if (isInLike) {
// 					return res.status(401).json({ error: "doublon like " });
// 				}
// 				sauce.likes += 1;
// 				sauce.usersLiked.push(req.body.userId);

// 				console.log("traitement " + req.body.like);
// 				// traitement du 1
// 			} else {
// 				if (req.body.like === 0) {
// 					console.log("traitement " + req.body.like);
// 					sauce.usersLiked.forEach((userId, index) => {
// 						if (sauce.usersLiked[index] === req.body.userId) {
// 							sauce.usersLiked.splice(index, 1);
// 							sauce.likes -= 1;
// 						}
// 					});
// 					sauce.usersDisliked.forEach((userId, index) => {
// 						if (sauce.usersDisliked[index] === req.body.userId) {
// 							sauce.usersDisliked.splice(index, 1);
// 							sauce.dislikes -= 1;
// 						}
// 					});

// 					// traitement du 0
// 				} else if (req.body.like === -1) {
// 					const isInDislike = sauce.usersDisliked.includes(req.body.userId);
// 					if (isInDislike) {
// 						return res.status(401).json({ error: "doublon dislike " });
// 					}
// 					sauce.dislikes += 1;
// 					sauce.usersDisliked.push(req.body.userId);
// 					console.log("traitement " + req.body.like);
// 					// traitement du -1
// 				}
// 			}
// 			// update likes
// 			Sauce.updateOne(
// 				{ _id: req.params.id },
// 				{
// 					$set: {
// 						likes: sauce.likes,
// 						dislikes: sauce.dislikes,
// 						usersLiked: sauce.usersLiked,
// 						usersDisliked: sauce.usersDisliked,
// 					},
// 				}
// 			)
// 				.then(() => res.status(200).json({ message: "Objet modifié !" }))
// 				.catch(error => res.status(400).json({ error }));
// 		})
// 		.catch(error => res.status(404).json({ error }));
// };
