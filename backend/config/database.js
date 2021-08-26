const Sequelize = require("sequelize");
require("dotenv").config();

const conf = {
	username: "root",
	password: "Fr05072003",
	database: "groupomania",
	host: "localhost",
	dialect: "mysql",
	// dialectOptions: {
	//     useUTC: false,
	//     dateStrings: true,
	//     typeCast: true
	// },
	// timezone: '+01:00',
};

module.exports = new Sequelize(conf);
