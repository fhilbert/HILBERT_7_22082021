const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const user = require("./user.js");

// Initialise Sequelize
const config = {
    username: USER,
    password: PASSWORD,
    database: DB,
    host: HOST,
    dialect: "mysql",
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    },
    timezone: '+01:00',
}

const sequelize = new Sequelize(config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);
db.post_comment = require("./post_comment.js")(sequelize, Sequelize);
db.post_read = require("./post_read.js")(sequelize, Sequelize);

module.exports = db;