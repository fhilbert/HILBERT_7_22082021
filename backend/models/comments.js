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
			comment: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "Comments",
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
	return Comment;
};
