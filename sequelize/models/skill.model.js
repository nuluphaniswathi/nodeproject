const sequelize=require("../db/db.config");
const {DataTypes}=require("sequelize");
const {Person}=require('./person.model');
//creating model
exports.Skill=sequelize.define('skill',{
    skill_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    skill_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    person_id:{
        type:DataTypes.INTEGER,
        references:{
            model:Person,
            key:"person_id"
        }
    }


},{
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    freezeTableName:true
});
//(async()=>await this.User.sync())();
(async()=>await this.Skill.sync())();