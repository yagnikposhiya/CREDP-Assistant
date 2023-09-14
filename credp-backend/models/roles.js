const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define(
  'roles',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: Sequelize.STRING,
      field: 'role_id',
    },
    name: {
      type: Sequelize.STRING,
      field: 'name',
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



module.exports = Role;
