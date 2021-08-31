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
			],
		}
	);
	return Like;
};
