const jwt = require("jsonwebtoken");
const db = require("../models");

const Post = require("../models/posts");

module.exports = (req, res, next) => {
	try {
		console.log("isOwner .......");
		const token = req.headers.authorization.split(" ")[1];
		const tokenkey = process.env.TOKENKEY;
		console.log(tokenkey);
		const decodedToken = jwt.verify(token, tokenkey);
		console.log(decodedToken);
		const userId = decodedToken.userId;
		console.log("userId");
		console.log(userId);
		db.Post.findOne({ where: { id: req.params.id } })
			.then(post => {
				console.log("post.UserId .......");
				console.log(post.UserId);

				if (post.UserId === userId) {
					next();
				} else {
					throw "UserId non autorisé";
				}
			})
			.catch(error => res.status(403).json({ error }));
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiée !" });
	}
};
