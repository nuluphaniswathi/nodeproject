//import express application
const exp=require("express");
const app=exp();

//import expressAsync handler
const expressAsyncHandler=require("express-async-handler")


//const sequelize=require("./config/config.json")

app.listen(4000,()=>console.log("port is running on 4000"));

app.use(exp.json());
//import user model
const userModel=require("./models/user.js");
const db=require("./models/index");
const {DataTypes}=require("sequelize");
let User=userModel(db.sequelize,DataTypes)
//creating route
app.post("/user",expressAsyncHandler(async(req,res)=>{
    await User.create(req.body);
    res.send({message:"User created"});
}))
//get data
app.get("/user",expressAsyncHandler(async(req,res)=>{
    let getUsers=await User.findAll();
    res.send({message:"get users",payload:getUsers});
}))
