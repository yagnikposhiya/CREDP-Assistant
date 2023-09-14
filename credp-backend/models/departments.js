const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Department = sequelize.define(
  'departments',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      field: 'name',
    },
    institute_id: {
      type: Sequelize.INTEGER,
      field: 'institute_id',
    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
    freezeTableName: true,
  },
);

module.exports = Department;
