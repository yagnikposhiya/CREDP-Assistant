const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const { MEDIUM,STATUS ,GENDER} = require('../utils/constant');

const Student = sequelize.define(
  'students',
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
    std: {
      type: Sequelize.INTEGER,
      field: 'std',
    },
    mobile: {
      type: Sequelize.STRING,
      field: 'mobile',
    },
    medium: {
      type: Sequelize.ENUM(MEDIUM.GUJARATI, MEDIUM.ENGLISH, MEDIUM.HINDI),
      defaultValue: MEDIUM.GUJARATI,
      field: 'medium',
    },
    gender: {
      type:Sequelize.ENUM(GENDER.MALE,GENDER.MALE),
      defaultValue:GENDER.MALE,
      field:'gender'
    },
    dob: {
      type: Sequelize.DATEONLY,
      field: 'dob',
    },
    address: {
      type: Sequelize.STRING,
      field: 'address',
    },
    school_id: {
      type: Sequelize.INTEGER,
      field: 'school_id',
    },
    joining_date: {
      type: Sequelize.DATEONLY,
      field: 'joining_date',
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

module.exports = Student;
