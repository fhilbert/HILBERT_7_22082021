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
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
			],
		}
	);
	return Post;
};
