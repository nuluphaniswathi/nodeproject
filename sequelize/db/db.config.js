//import sequelize
const {Sequelize}=require("sequelize")//it is a constructor we can use it by instantiating it

//create instance
const sequelize=new Sequelize(
    // process.env.DB_NAME,
    "new","wal","WESTAGILELABS2023",
    // process.env.DB_USER,
    // process.env.PASSWORD,
    {
        host:'localhost',
        dialect:"mysql"
    }
);


//export
module.exports=sequelize;