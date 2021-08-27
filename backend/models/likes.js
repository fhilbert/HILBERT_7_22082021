module.exports = (sequelize, Sequelize) => {
	const Like = sequelize.define(
		"Likes",
		{
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			idPosts: {
				type: Sequelize.INTEGER,
				allowNull: false,
				// allowNull: true,
				references: {
					model: "Posts",
					key: "id",
				},
			},
			idUsers: {
				type: Sequelize.INTEGER,
				allowNull: false,
				// allowNull: true,
				references: {
					model: "Users",
					key: "id",
				},
			},

			valeur: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "Likes",
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "fk_like_user_idx",
					using: "BTREE",
					fields: [{ name: "idUsers" }],
				},
				{
					name: "fk_like_post_idx",
					using: "BTREE",
					fields: [{ name: "idPosts" }],
				},
			],
		}
	);
	return Like;
};
