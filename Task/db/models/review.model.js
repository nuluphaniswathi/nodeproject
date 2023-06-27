const sequelize=require("../inventory.db");
const {DataTypes}=require("sequelize");
//creating review model
exports.Review=sequelize.define("model",{
    review_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    review_date:{
        type:DataTypes.STRING,
        allowNull:false
    },
    review_desc:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{
    timestamps:false,
    freezeTableName:true
})