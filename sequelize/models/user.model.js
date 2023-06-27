const sequelize=require("../db/db.config");
const {DataTypes}=require("sequelize");
const bcryptjs=require("bcryptjs");
exports.User=sequelize.define('user',{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
        //save all string data into lowercase
        get(){
            let FirstName=this.getDataValue('firstName');
            let gender=this.getDataValue('gender');
            if(gender=="male")
            {
                return "Mr" +FirstName 
            }
            else{
                return "Mrs" +FirstName
            }
            return FirstName
         },
        set(FirstName){
            this.setDataValue('firstName',FirstName.toLowerCase());

        },
        validate:{
            //custom validator
            checkName(FirstName){
               if(FirstName.length<=4){
                  throw new Error("length of firstname should be greater than 4 chars");
               }
           }
       }


    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false,
        //save all string data into lowercase
        get(){
            let LastName=this.getDataValue('lastName')
            return LastName
         },
        set(LastName){
            this.setDataValue('lastName',LastName.toLowerCase());

        }


    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        get(){
            let Email=this.getDataValue('email')
            return Email
         },
        set(Email){
            this.setDataValue('email',Email.toLowerCase());

        },
        //validating email
        validate:{
            //msg:"Email is invalid"
            isEmail:true
        }

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        get(){
            let pwd=this.getDataValue('password')
            return pwd
         },
        set(pwd){
            this.setDataValue('password',pwd.toLowerCase());

        }
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
        // age shd be between 20 and 25
        validate:{
            checkAge(age)
            {
                if(!(age>20 && age<25)){
                   throw new Error("should provide age between 20 and 25");

                }
            }
        }

    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false,
        get(){
            let Gender=this.getDataValue('gender')
            return Gender
         },
        set(Gender){
            this.setDataValue('gender',Gender.toLowerCase());

        }
        

    }



},{
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    //tableName:"abcd",
    //freezeTableName:false  
});
(async()=>await this.User.sync())();