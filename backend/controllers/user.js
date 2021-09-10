const db = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CryptoJS = require("crypto-js");

const key = process.env.CRYPTKEY;
const keyutf = CryptoJS.enc.Utf8.parse(key);
const iv = CryptoJS.enc.Base64.parse(key);

const User = require("../models/users");

// validation
exports.userCheck = (req, res, next) => {
	// user
	if (req.body.email === "") return res.status(405).json({ message: "email vide" });
	const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!req.body.email.match(mailFormat)) {
		return res.status(405).json({ message: "email invalide" });
	}
	// password
	if (req.body.password === "") {
		return res.status(405).json({ message: "Mot de passe vide" });
	}
	const pswdFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
	if (!req.body.password.match(pswdFormat)) {
		return res.status(405).json({ message: " 8 caractères minimum et au 1 majuscule, 1 minuscule, 1 chiffre" });
	}
	next();
};

exports.signup = (req, res, next) => {
	console.log("signup");
	const enc = CryptoJS.AES.encrypt(req.body.email, keyutf, { iv: iv });
	const encMail = enc.toString();
	bcrypt
		.hash(req.body.password, 10)
		.then(hash => {
			const newUser = {
				// email: encMail,
				email: req.body.email,
				password: hash,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				bio: req.body.bio,
			};
			db.User.create(newUser)
				.then(() => res.status(201).json({ message: "Utilisateur crée !" }))
				.catch(error => res.status(400).json({ message: "Déjà inscrit !" }));
		})
		.catch(error => res.status(503).json({ error }));
};

exports.login = (req, res, next) => {
	const tokenkey = process.env.TOKENKEY;
	const enc = CryptoJS.AES.encrypt(req.body.email, keyutf, { iv: iv });
	const encMail = enc.toString();
	console.log(tokenkey);

	const data = db.User.findOne({ where: { email: req.body.email } })
		// User.findOne({ email: encMail })
		.then(user => {
			// console.log(user);

			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: user.id,
						token: jwt.sign({ userId: user._id }, tokenkey, { expiresIn: "24h" }),
					});
				})
				.catch(error => res.status(501).json({ error }));
		})
		.catch(error => res.status(502).json({ error }));
	console.log(data);

	// User.findOne({ email: encMail })
	// 	.then(user => {
	// 		if (!user) {
	// 			return res.status(401).json({ error: "Utilisateur non trouvé !" });
	// 		}
	// 		bcrypt
	// 			.compare(req.body.password, user.password)
	// 			.then(valid => {
	// 				if (!valid) {
	// 					return res.status(401).json({ error: "Mot de passe incorrect !" });
	// 				}
	// 				res.status(200).json({
	// 					userId: user._id,
	// 					token: jwt.sign({ userId: user._id }, tokenkey, { expiresIn: "24h" }),
	// 				});
	// 			})
	// 			.catch(error => res.status(501).json({ error }));
	// 	})
	// 	.catch(error => res.status(502).json({ error }));
};
exports.getOneProfile = (req, res, next) => {
	console.log("getOneProfile");
	console.log("--------");
	console.log(req.params.id);

	db.User.findOne({ where: { id: req.params.id } })
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => res.status(404).json({ error }));
};

exports.modifyProfile = (req, res, next) => {
	console.log("modifyProfile");
	if (req.file) {
		db.User.findOne({ where: { id: req.params.id } })
			.then(user => {
				// const filename = user.imageUrl.split("/images/")[1];
				// fs.unlink(`images/${filename}`, err => {
				// 	if (err) throw err;
				// 	console.log("unlink img");
				// });
				// db.User.update({
				// 	bio: req.body.bio,
				// })
				// 	.then(() => res.status(200).json({ message: "Updated profile" }))
				// 	.catch(error => res.status(400).json({ error: "Unable to update proofile" }));
			})
			.catch(error => res.status(500).json({ error }));
	}
};

exports.deleteProfile = async (req, res, next) => {
	console.log("--------");
	console.log("deleteProfile");
	console.log("--------");
	console.log(req.params.id);
	await db.User.destroy({ where: { id: req.params.id } })
		.then(() => res.status(200).json({ message: "Objet supprimé !" }))
		.catch(error => res.status(400).json({ error }));

	db.User.findOne({ where: { id: req.params.id } })
		.then(user => {
			//console.log(user);

			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				db.User.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: "Objet supprimé !" }))
					.catch(error => res.status(400).json({ error }));
			});
		})
		.catch(error => res.status(500).json({ error }));
};
exports.getAllProfiles = (req, res, next) => {
	console.log("--------");
	console.log("deleteProfile");
	db.User.findAll()
		.then(post => res.status(200).json(post))
		.catch(error => console.log(error));
};
