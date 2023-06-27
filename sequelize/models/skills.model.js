const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize")

//users model
exports.Skills=sequelize.define("skills",{
    skill_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    skill_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})