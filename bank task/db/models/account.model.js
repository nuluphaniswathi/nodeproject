const sequelize=require("../db.config.js");
const {DataTypes}=require("sequelize");

exports.Accounts=sequelize.define("account",{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    bank_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    account_no:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})
