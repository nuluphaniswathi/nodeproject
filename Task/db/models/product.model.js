const sequelize=require("../inventory.db");
const {DataTypes}=require("sequelize");
//creating customer model
exports.Product=sequelize.define("product",{
    product_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    product_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    product_price:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})
