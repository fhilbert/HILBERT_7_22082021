const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		console.log("---------");
		console.log("auth");
		const token = req.headers.authorization.split(" ")[1];
		const tokenkey = process.env.TOKENKEY;
		const decodedToken = jwt.verify(token, tokenkey);
		console.log(token);
		console.log(tokenkey);
		console.log(decodedToken);

		const userId = decodedToken.userId;
		console.log(userId);
		console.log(req.body.UserId);

		if (req.body.UserId && req.body.UserId !== userId) {
			throw "User ID non valable ! ";
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({ error: error | "Requête non authentifiée !" });
	}
};
