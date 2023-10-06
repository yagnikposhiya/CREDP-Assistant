const { STATUS } = require('../utils/constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('volunteer-attendance', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      std: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      present: {
        type: Sequelize.BOOLEAN,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      in_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      out_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,        
      },
      chapter_no: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,   
      },
      topic:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,   
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
    await queryInterface.dropTable('volunteer-attendance');
  },
};
