const sequelize=require("../db.config");
const {DataTypes}=require("sequelize");

exports.Owner=sequelize.define("owner",{
    owner_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    owner_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})