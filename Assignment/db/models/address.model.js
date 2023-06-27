const sequelize=require("../db.inventory");
const {Op}=require("sequelize");
const {DataTypes}=require("sequelize")
//creating student model
exports.Address=sequelize.define("address",{
    address_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    street:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            checkCity(city){
                if(!(city=="bangalore" || city=="chennai" || city=="hyderabad")){
                    throw new Error("city should be either bangalore or chenai or hyderabad")
                }
            }
        }
    }
},{
    timestamps:false,
    freezeTableName:false
})