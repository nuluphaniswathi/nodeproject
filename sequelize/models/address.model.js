const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize")

//address model
exports.Address=sequelize.define("address",{
    street:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    timestamps:false,
    freezeTableName:true
})