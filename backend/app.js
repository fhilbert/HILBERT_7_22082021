const { Sequelize, DataTypes } = require("sequelize");

const express = require("express");
const app = express();

const helmet = require("helmet");

const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors"); // CORS - Permit access to API
// const env = process.env.NODE_ENV || "development";
// const config = require("./config/config.json")[env];

// Database
const datab = require("./config/database.js");
const db = require("./models");
// db.sequelize.sync();
db.sequelize.sync({ force: true });

// Test DB
datab
	.authenticate()
	.then(() => console.log("Database connected..."))
	.catch(error => console.log("Unable to connect to the database:"));

// // connection to mysql
// const sequelize = new Sequelize(config.database, config.username, config.password, {
// 	host: "localhost",
// 	dialect: "mysql",
// });

// const User = sequelize.define(
// 	"User",
// 	{
// 		// Model attributes are defined here
// 		firstName: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		lastName: {
// 			type: DataTypes.STRING,
// 			// allowNull defaults to true
// 		},
// 	},
// 	{
// 		// Other model options go here
// 	}
// );

// async function test() {
// 	try {
// 		await sequelize.authenticate();
// 		console.log("Connection has been established successfully.");
// 		// await User.sync({ force: true });
// 		// await User.create({ firstName: "Jane", lastName: "Doe" });
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// }
// test();

// app.get("/users", async (req, res) => {
// 	const users = await User.findAll();
// 	res.json(users);
// });
// app.listen(3001);

// //--------------------------------------------------

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

//routes
app.use("/images", express.static(path.join(__dirname, "images")));

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");

app.use("/api/posts", postsRoutes);
app.use("/api/auth", usersRoutes);

module.exports = app;
