const db = require("../models");

exports.createPost =
	("/posts",
	async (req, res, next) => {
		const newPost = {
			id: req.body.id,
			idUsers: req.body.idUsers,
			content: req.body.content,
			attachment: req.body.attachment,
		};

		await db.Post.create(newPost);

		res.json(newPost);
	});
