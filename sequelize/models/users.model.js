const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize")

//users model
exports.Users=sequelize.define("users",{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    user_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})