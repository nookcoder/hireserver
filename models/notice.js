const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Notice',
            tableName: 'notices',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(database) {
        database.Company.belongsTo(database.Company, { foreignKey: 'notice_id', sourceKey: "id" });        
    }
};