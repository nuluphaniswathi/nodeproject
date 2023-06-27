const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize");

//account model

exports.Accounts=sequelize.define("accounts",{
    bank_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    account_number:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})