const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const VolunteerAttendance = sequelize.define(
  'student-attendance',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      field: 'user_id',
    },
    std: {
      type: Sequelize.INTEGER,
      field: 'std',
    },
    present: {
      type: Sequelize.BOOLEAN,
      field: 'present',
    },
    date: {
      type: Sequelize.DATEONLY,
      field: 'date',
    },
    in_time: {
      type: Sequelize.TIME,
      field: 'in_time',
    },
    out_time: {
      type: Sequelize.TIME,
      field: 'out_time',
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



module.exports = VolunteerAttendance;
