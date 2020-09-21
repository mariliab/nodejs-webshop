const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', process.env.LOCAL_DATABASE_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost'    
});

module.exports = sequelize;