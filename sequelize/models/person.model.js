const sequelize=require("../db/db.config");
const {DataTypes}=require("sequelize");

exports.Person=sequelize.define('person',{
    person_id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    person_name:{
        type:DataTypes.STRING,
        allowNull:false
    }


},{
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    freezeTableName:true
});
//(async()=>await this.User.sync())();
(async()=>await this.Person.sync())();