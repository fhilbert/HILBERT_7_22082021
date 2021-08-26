const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const app = express();
app.use(express.json());

const sequelize = new Sequelize("groupomania_dev", "root", "Fr05072003", {
	host: "localhost",
	dialect: "mysql",
});

const User = sequelize.define(
	"User",
	{
		// Model attributes are defined here
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			// allowNull defaults to true
		},
	},
	{
		// Other model options go here
	}
);

async function test() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		await User.sync({ force: true });
		await User.create({ firstName: "Jane", lastName: "Doe" });
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}
test();

app.get("/users", async (req, res) => {
	const users = await User.findAll();
	res.json(users);
});

app.post("/users", async (req, res) => {
	const newUser = { firstName: req.body.firstName, lastName: req.body.lastName };
	await User.create(newUser);
	res.json(newUser);
});

app.listen(3001);

// const { Sequelize, Datatypes } = require("sequelize");
// const sequelize = new Sequelize("groupomania_dev", "root", "Fr05072003", {
// 	host: "localhost",
// 	dialect: "mysql",
// });

// async function test() {
// 	try {
// 		await sequelize.authenticate();
// 		console.log("Connection has been established successfully.");
// 		// await User.sync({ force: true });
// 		// console.log("The table for the User model was just (re)created!");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// }
// test();
