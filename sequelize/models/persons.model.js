const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize");

//creating persons model
exports.Persons=sequelize.define("persons",{
    cust_id:{
    type:DataTypes.INTEGER,
    primaryKey:true
    },
    cust_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})