const sequelize=require("../db.inventory");
const {DataTypes}=require("sequelize")
const {Student}=require("./student.model")
//creating student model
exports.Semister=sequelize.define("semister",{
    semister_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    maths:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            minMarks(maths){
                if(maths<0){
                    throw new Error("enter marks >= 0")

                }
            },
            maxMarks(maths){
                if(maths>60){
                    throw new Error("enter marks <= 60")

                }
            }
        }
        
    },
    Physics:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            minMarks(maths){
                if(maths<0){
                    throw new Error("enter marks >= 0")

                }
            },
            maxMarks(maths){
                if(maths>60){
                    throw new Error("enter marks <= 60")

                }
            }
        }
        
    },
    Chemistry:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            minMarks(maths){
                if(maths<0){
                    throw new Error("enter marks >= 0")

                }
            },
            maxMarks(maths){
                if(maths>60){
                    throw new Error("enter marks <= 60")

                }
            }
        }
    },
    roll_no:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:Student,
            key:"roll_no"

        }
    }
   
},{
    timestamps:false,
    freezeTableName:false
})