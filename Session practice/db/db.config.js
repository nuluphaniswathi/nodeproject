const {Sequelize}=require("sequelize");
//create instance
const sequelize=new Sequelize(
    // process.env.DB_NAME,
    "session_practice","wal","WESTAGILELABS2023",
    // process.env.DB_USER,
    // process.env.PASSWORD,
    {
        host:'localhost',
        dialect:"mysql"
    }
);

sequelize.sync();
//export
module.exports=sequelize;