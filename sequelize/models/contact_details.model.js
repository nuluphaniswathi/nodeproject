const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize")

//users model
exports.ContactDetails=sequelize.define("contact_details",{
    mobile:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    landline:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})