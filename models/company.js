const Sequelize = require('sequelize');

module.exports = class Company extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
            company_id: {
                type: Sequelize.STRING(50),
                allowNull: false,
                //primaryKey: true, // Primary Key 여부
                unique: true,
            },
            company_pw: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            company_name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            company_email: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            company_domain: {
                type: Sequelize.STRING(50),
                allowNull: true,
            }
      },
          {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Company',
            tableName: 'companys',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
      );
    }

    static associate(database) {
        // company가 1, 채용공고 and 모집공고가 다
        // 1:다
        database.Company.hasMany(database.Notice, { constraints: false, foreignKey: 'company_id', sourceKey: "id" });
        database.Company.hasMany(database.Recruitment, { constraints: false, foreignKey: 'company_id', sourceKey: "id" });
    }
};