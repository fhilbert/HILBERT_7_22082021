const jwt = require("jsonwebtoken");
const db = require("../models");

const User = require("../models/users");

module.exports = (req, res, next) => {
	try {
		console.log("isUser .......");
		const token = req.headers.authorization.split(" ")[1];
		const tokenkey = process.env.TOKENKEY;
		console.log(tokenkey);
		const decodedToken = jwt.verify(token, tokenkey);
		console.log(decodedToken);
		const userId = decodedToken.userId;
		console.log("userId");
		console.log(userId);
		db.User.findOne({ where: { id: req.params.id } })
			.then(user => {
				// console.log(user.UserId);
				if (user.UserId === userId) {
					next();
				} else {
					db.User.findOne({ where: { id: userId } })
						.then(userAdmin => {
							if (userAdmin.isAdmin) {
								next();
							} else {
								throw "UserId non autorisé";
							}
						})
						.catch(error => res.status(403).json({ error }));
				}
			})
			.catch(error => res.status(403).json({ error }));
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiée !" });
	}
};
