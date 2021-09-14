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
db.User.hasMany(db.Post, { onDelete: "cascade", hooks: true });
db.Post.belongsTo(db.User);
// db.User.hasMany(db.Post, {
// 	as: "Post",
// });
// db.Post.belongsTo(db.User, {
// 	as: "User",
// });
//  Posts -- Comments
db.Post.hasMany(db.Comment, {
	foreignKey: {
		name: "PostId",
		allowNull: false,
	},
});
db.Comment.belongsTo(db.Post);
//  Comments -- Users
db.User.hasMany(db.Comment, { onDelete: "CASCADE", foreignKey: { allowNull: false }, hooks: true });
db.Comment.belongsTo(db.User);
// Posts -- Likes
db.Post.hasMany(db.Like, { onDelete: "CASCADE", foreignKey: { allowNull: false }, hooks: true });
db.Like.belongsTo(db.Post);
// Users -- Likes
db.User.hasMany(db.Like, { onDelete: "CASCADE", foreignKey: { allowNull: false }, hooks: true });
db.Like.belongsTo(db.User);

//  Posts - Likes - Users

// db.User.belongsToMany(db.Post, { through: "Likes" });
// db.Post.belongsToMany(db.User, { through: "Likes" });

module.exports = db;
