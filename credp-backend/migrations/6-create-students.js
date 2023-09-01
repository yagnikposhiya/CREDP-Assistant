const { STATUS,GENDER, MEDIUM } = require('../utils/constant');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      std: {
        type: Sequelize.INTEGER,
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      medium: {
        type: Sequelize.ENUM(MEDIUM.GUJARATI, MEDIUM.ENGLISH, MEDIUM.HINDI),
        defaultValue: MEDIUM.GUJARATI,
      },
      gender: {
        type: Sequelize.ENUM(GENDER.MALE,GENDER.FEMALE),
        defaultValue: GENDER.MALE,
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      school_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'schools',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      joining_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(STATUS.INACTIVE, STATUS.ACTIVE),
        defaultValue: STATUS.ACTIVE,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students');
  },
};
