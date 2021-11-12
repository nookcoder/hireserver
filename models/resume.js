const Sequelize = require('sequelize');

module.exports = class Resume extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            index:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                allowNull:false
            },
            name:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            birth:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            gender:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            email_id:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            email_address:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            phone_number:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            phone_number2:{
                type:Sequelize.STRING(45),
                allowNull:false,
            },
            motivate:{
                type:Sequelize.STRING(500),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps: false,
            modelName: 'Resume',
            tableName: 'resumes',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(database){
        database.Resume.belongsTo(database.Recruitment,{foreignKey:"resumes",targetKey:'id'});
    }
}