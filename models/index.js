var path = require('path');
var Sequelize = require('sequelize');
const Company = require('./company');
const Notice = require('./notice');
const Recruitment = require('./recruitment');

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var database = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

database.sequelize = sequelize;
database.Sequelize = Sequelize;

database.Company = Company;
database.Notice = Notice;
database.Recruitment = Recruitment;

Company.init(sequelize);
Notice.init(sequelize);
Recruitment.init(sequelize);

Company.associate(database);
Notice.associate(database)
Recruitment.associate(database)

module.exports = database;
