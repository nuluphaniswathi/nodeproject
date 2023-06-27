const sequelize=require("../inventory.db");
const {DataTypes}=require("sequelize");
//creating order table
exports.Orders=sequelize.define("orders",{
    order_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    order_date:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})