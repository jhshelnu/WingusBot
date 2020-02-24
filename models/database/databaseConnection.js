const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	define: {
		timestamps: false,
		rejectOnEmpty: true,
	}
});

module.exports = db;