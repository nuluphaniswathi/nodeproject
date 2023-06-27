const sequelize=require("../db.config");
const {DataTypes}=require("sequelize");

exports.Videos=sequelize.define("video",{
    video_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    video_title:{
        type:DataTypes.STRING,
        allowNull:false
    }
})