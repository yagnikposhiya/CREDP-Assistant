const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const { STATUS,GENDER } = require('../utils/constant');

const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: Sequelize.STRING,
      field: 'student_id',
    },
    discord_id: {
      type: Sequelize.STRING,
      field: 'discord_id',
    },
    username: {
      type: Sequelize.STRING,
      field: 'username',
    },
    
    name: {
      type: Sequelize.STRING,
      field: 'name',
    },
    gender: {
      type:Sequelize.ENUM(GENDER.MALE,GENDER.MALE),
      defaultValue:GENDER.MALE,
      field:'gender'
    },
    cemail: {
      type: Sequelize.STRING,
      field: 'cemail',
    },
    pemail: {
      type: Sequelize.STRING,
      field: 'pemail',
    },
    password: {
      type: Sequelize.STRING,
      field: 'password',
    },
    department_id: {
      type: Sequelize.INTEGER,
      field: 'department_id',
    },
    role_id: {
      type: Sequelize.INTEGER,
      field: 'role_id',
    },
    joining_date: {
      type: Sequelize.DATEONLY,
      field: 'joining_date',
    },
    available_months: {
      type: Sequelize.INTEGER,
      field: 'available_months',
    },
    status: {
      type: Sequelize.ENUM(STATUS.INACTIVE, STATUS.ACTIVE),
      field: 'status',
      defaultValue: STATUS.ACTIVE,
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

module.exports = User;
