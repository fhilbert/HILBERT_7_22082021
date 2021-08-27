"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// tables references
db.User = require("./users")(sequelize, Sequelize);
db.Post = require("./posts")(sequelize, Sequelize);
db.Comment = require("./comments")(sequelize, Sequelize);
db.Like = require("./likes")(sequelize, Sequelize);

//relations

//  Posts -- Users
db.User.hasMany(db.Post, {
	foreignKey: "Idusers",
	as: "Post",
});
db.Post.belongsTo(db.User, {
	foreignKey: "userId",
	as: "User",
});

// Comments -- Posts
// db.Post.hasMany(db.Comment, {
// 	foreignKey: "postId",
// 	as: "Comment",
// });
// db.Comment.belongsTo(db.Post, {
// 	foreignKey: "postId",
// 	as: "Post",
// });

module.exports = db;
