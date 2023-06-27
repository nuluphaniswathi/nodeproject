const sequelize=require("../db.config.js");
const {DataTypes}=require("sequelize");

exports.User=sequelize.define("user",{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    freezeTableName:true
})