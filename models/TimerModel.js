const { DataTypes, Model } = require('sequelize');
const db = require('./database/databaseConnection.js');

class TimerModel extends Model { }

TimerModel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	duration: {
		type: DataTypes.INTEGER,
		allowNull: false,
	}
}, {
	sequelize: db,
	modelName: 'timers',
	freezeTableName: true
});

module.exports = TimerModel;