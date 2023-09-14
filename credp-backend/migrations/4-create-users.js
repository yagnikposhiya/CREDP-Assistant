const { STATUS, GENDER } = require('../utils/constant');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      discord_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
      name: {
        type: Sequelize.STRING,
      },
      gender: {
        type:Sequelize.ENUM(GENDER.MALE,GENDER.FEMALE),
        defaultValue:GENDER.MALE,
      },
      cemail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      pemail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull:true
      },
      department_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'departments',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        allowNull: true,
      },
      joining_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      available_months: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('users');
  },
};
