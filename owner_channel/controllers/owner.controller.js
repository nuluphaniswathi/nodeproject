//import expressasync handler
const expressAsyncHandler=require("express-async-handler");

//importing models
const {Owner}=require("../db/models/owner.model");
const {Channel}=require("../db/models/channel.model");
const {Videos}=require("../db/models/video.model");

//importing sequelize
const sequelize=require("../db/db.config")

//relationship establishment
//Owner to channel one to one
Owner.Channel=Owner.hasOne(Channel,{foreignKey:"owner_id",allowNull:false})
Channel.Owner=Channel.belongsTo(Owner,{foreignKey:"owner_id",allowNull:false})
//channel to video has many
Channel.Videos=Channel.hasMany(Videos,{foreignKey:"channel_id",allowNull:false})
Videos.Channel=Videos.belongsTo(Channel,{foreignKey:"channel_id",allowNull:false})

exports.createOwner=expressAsyncHandler(async(req,res)=>{
    await Owner.create(req.body,{
        include:{

            association:Owner.Channel,
            include:
            
            {
                association:Channel.Videos
            }
        }
        
    })
    res.send({message:"created"});
})
exports.getData=expressAsyncHandler(async(req,res)=>{
    let data=await Owner.findAll({
        include:{
            model:Channel,
            include:{
                model:Videos,
            },
        },
     });
    
    res.send({message:"Details",payload:data})
})