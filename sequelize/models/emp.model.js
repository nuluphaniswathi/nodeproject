const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize");

//emp model
exports.Emp=sequelize.define("emp",{
    emp_id:{
        type:DataTypes.INTEGER,
        primarykey:true
    },
    emp_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})
