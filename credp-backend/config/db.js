const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    logging: false,
    
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
   
  },
  
);

sequelize
  .authenticate()
  .then(() => console.info(`${new Date()} Database Connection has been established successfully.`))
  .catch((err) => console.error(`${new Date()} Unable to connect to the database: ${err}`));

module.exports = sequelize;
