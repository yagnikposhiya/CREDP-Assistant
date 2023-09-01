const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const StudentAttendance = sequelize.define(
  'student-attendance',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: Sequelize.INTEGER,
      field: 'student_id',
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
    }
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



module.exports = StudentAttendance;
