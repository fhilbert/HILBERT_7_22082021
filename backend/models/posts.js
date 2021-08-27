module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define(
		"Posts",
		{
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
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
			content: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			attachment: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: "Posts",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "fk_post_user_idx",
					using: "BTREE",
					fields: [{ name: "idUsers" }],
				},
			],
		}
	);
	return Post;
};
