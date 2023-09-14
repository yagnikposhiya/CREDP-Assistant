const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const School = sequelize.define(
  'schools',
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
    address: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'address',
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'mobile',
    },
    email: {
      type: Sequelize.STRING,
      field: 'email',
    },
    principal_name: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'principal_name',
    },
    status: {
      type: Sequelize.ENUM(STATUS.INACTIVE, STATUS.ACTIVE),
      defaultValue: STATUS.ACTIVE,
      field: 'status',
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



module.exports = School;
