module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define(
		"Comments",
		{
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			idPosts: {
				type: Sequelize.INTEGER,
				// allowNull: false,
				allowNull: true,
				references: {
					model: "Posts",
					key: "id",
				},
			},
			idUsers: {
				type: Sequelize.INTEGER,
				// allowNull: false,
				allowNull: true,
				references: {
					model: "Users",
					key: "id",
				},
			},

			comment: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "Comments",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "fk_comment_user_idx",
					using: "BTREE",
					fields: [{ name: "idUsers" }],
				},
				{
					name: "fk_comment_post_idx",
					using: "BTREE",
					fields: [{ name: "idPosts" }],
				},
			],
		}
	);
	return Comment;
};
