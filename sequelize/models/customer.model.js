//import sequelize
const sequelize=require("../db/db.config");
const {DataTypes}=require("sequelize");
const bcryptjs=require("bcryptjs");
// create Customer model
//.define(first parameter converts into plural whent we dont give table name like customers table created
//)
// Create “User”  model with properties firstName,lastName,email,password,age & gender
// save all string data in  lowercase
// validate email
// age shd be between 20 and 25
// length of firstName shd be greater than 4 chars
// While reading users data , add “Mr ” to males and “Ms.” to females
exports.User=sequelize.define('user',{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false,
        get(){
            let FirstName=this.getDataValue('firstName')
            return FirstName
         },
        set(FirstName){
            this.setDataValue('firstName',FirstName.toLowerCase());
        },
        validate:{
             //custom validator
             checkName(FirstName){
                if(FirstName.length<=4){
                   throw new Error("length of firstname should be greater than 4 chars")
                }
            }


        }

    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false

    },
    gender:{
        type:DataTypes.INTEGER,
        allowNull:false ,

    }



},{
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    //tableName:"abcd",
    //freezeTableName:false  
});
/*
exports.Customer=sequelize.define('customer',{
    customer_id:{
        type:DataTypes.INTEGER,
       primaryKey:true
    },
    customer_name:{
        type:DataTypes.STRING,
        allowNull:false,
         get(){
            let custName=this.getDataValue('customer_name')
            return 'Mrs.'+custName
         },
        set(custName){
            this.setDataValue('customer_name',custName.toLowerCase());

        },
        validate:{
            //custom validator
            checkName(custName){
                if(custName.length<=2){
                    new Error("length of customer should be greater than 2")
                }
            }
        }
        // validate:{
        //     isAlpha: true,
        //     isUppercase:{
        //         msg:"checking cust_name in uppercase"
        //     }

        // }


    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        set(password){
            //hashpassword
           let hash=bcryptjs.hashSync(password,5);
            //set datavalue
            this.setDataValue('password',hash)
        }

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            //msg:"Email is invalid"
            isEmail:true
        }
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
        get(){
            let Age=this.getDataValue('age');
            return Age +'Years'
        },
         validate:{
            //isNumeric: true
            isInt: true

        }
    }
},{
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    //tableName:"abcd",
    //freezeTableName:false
    

});*/
//instead creating table everytime make it global using immediately invoke expression function
//(async()=>await this.Customer.sync())();
(async()=>await this.User.sync())();
// named export
//module.exports=Customer;