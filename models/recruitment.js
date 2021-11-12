const Sequelize = require('sequelize');

// 현욱 오빠가 한대로 수정 요
module.exports = class Recruitment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: { // 제목
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            start_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            type: { // 채용 구분
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            category: { // 채용 분야
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            division_infomation: { // 모집분야
                type: Sequelize.TEXT,
                allowNull: false,
            },
            work_infomation: { // 업무내용
                type: Sequelize.TEXT,
                allowNull: false,
            },
            qualification_infomation: { // 지원자격
                type: Sequelize.TEXT,
                allowNull: false,
            },
            submit_infomation: { // 제출서류
                type: Sequelize.TEXT,
                allowNull: false,
            },
            help_infomation: { // 도움말
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Recruitment',
            tableName: 'recruitments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(database) {
        database.Company.belongsTo(database.Company, { foreignKey: 'recruitment_id', sourceKey: "id" });        
        database.Recruitment.hasOne(database.Resume,{ constraints: false, foreignKey: 'resumes', sourceKey: "id" })
    }
};