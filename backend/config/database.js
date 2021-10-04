const Sequelize = require("sequelize");
require("dotenv").config();

const conf = {
	username: "root",
	password: "Fr05072003",
	database: "groupomania",
	host: "localhost",
	dialect: "mysql",
};

module.exports = new Sequelize(conf);
