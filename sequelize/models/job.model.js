const sequelize=require("../db/db.config.js");
const {DataTypes}=require("sequelize");
//job model
exports.Job=sequelize.define("job",{
    job_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    job_desc:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    freezeTableName:true
})