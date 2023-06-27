const sequelize=require("../inventory.db");
const {DataTypes}=require("sequelize");
//creating customer model
exports.Customer=sequelize.define("customer",{
    customer_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    customer_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    customer_email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})
