const Sequelize = require('sequelize');
const sequelize = require('../config/config');

const Admin = require('./admin')(sequelize, Sequelize);
const Staff = require('./staff')(sequelize, Sequelize);
const Member = require('./member')(sequelize, Sequelize);

sequelize.sync();

module.exports = { Admin, Staff, Member };