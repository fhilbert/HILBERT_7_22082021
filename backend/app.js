const express = require("express");
const app = express();

const helmet = require("helmet");

const dotenv = require("dotenv").config();
const path = require("path");
const cors = require("cors"); // CORS - Permet à l'application d'accéder à l'API

//routes

// const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");

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

app.use("/images", express.static(path.join(__dirname, "images")));

// app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
