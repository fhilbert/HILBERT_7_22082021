module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		"Users",
		{
			id: {
				autoIncrement: true,
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			firstName: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			bio: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			isAdmin: {
				type: Sequelize.TINYINT,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			tableName: "Users",
			timestamps: true,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "email_UNIQUE",
					unique: true,
					using: "BTREE",
					fields: [{ name: "email" }],
				},
			],
		}
	);
	return User;
};
