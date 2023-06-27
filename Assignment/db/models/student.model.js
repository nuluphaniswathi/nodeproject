const sequelize=require("../db.inventory");
const {DataTypes}=require("sequelize")
//creating student model
exports.Student=sequelize.define("student",{
    roll_no:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            checkName(name){
                if(name.length<=2){
                    throw new Error("Namelength should be greater than 2");
                }
            }
        }

    },
    dob:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:true
    }
    
},{
    timestamps:false,
    freezeTableName:false
})
