//importing sequelize
const {Sequelize}=require("sequelize")
require("dotenv").config();

//creating instance of sequelize
const sequelize=new Sequelize(
    "tasks","wal","WESTAGILELABS2023",

    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.PASSWORD,
    {
        host:'localhost',
        dialect:"mysql"
    }
);
sequelize.sync();
module.exports=sequelize;