'use strict';

module.exports = function exports(sequelize, DataTypes) {
    const Report = sequelize.define('reports', {
    	id: {
            type: DataTypes.INT,
            primaryKey: true
        }
        report: DataTypes.TEXT
	}, {
		timestamps: true
	});

    return Report;
};
