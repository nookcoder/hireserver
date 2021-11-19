const Sequelize = require('sequelize');

module.exports = class Resume extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            id:{
                type:Sequelize.INTEGER,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true,
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
            interview_group:{
                type:Sequelize.STRING(45),
                allowNull:true,
            },
            interview_location:{
                type:Sequelize.STRING(45),
                allowNull:true,
            },
            interview_date:{
                type:Sequelize.DATEONLY,
                allowNull:true,
            },
            interview_time:{
                type:Sequelize.TIME,
                allowNull:true,
            },
            motivate:{
                type:Sequelize.STRING(500),
                allowNull:false,
            },
            recruitments_id:{
                type:Sequelize.INTEGER,
                allowNull:false,
            },  
            company_id:{
                type:Sequelize.INTEGER,
                allowNull:false
            },
            pass:{
                type:Sequelize.INTEGER,
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
    }
}