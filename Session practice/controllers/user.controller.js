//import express async handler
const expressAsyncHandler=require("express-async-handler")
//importing model
const {User}=require("../db/models/user.model")
//importing operators
const {Op}=require("sequelize")
//user registration
exports.registerUser=expressAsyncHandler(async (req,res)=>{
  let user=await User.findOne({where:{"username":req.body.username}})
  if(user==undefined){
    await User.create(req.body)
    res.send({message:"User created"})
  }
  else{
    res.send({message:"user already exists"})
  }
})
//user login
exports.loginUser=expressAsyncHandler(async (req,res)=>{
  //check if user exists or not
  let user=await User.findOne({where:{[Op.and]: [
    { "username":req.body.username},
    {"password":req.body.password}
  ]}})
  console.log("users",user);
  if(user==undefined){
    res.send({message:"Invalid credentials"})
  }
  else{
    //initialise session
      console.log("session",req.session)
      req.session.username=user.username
      req.session.pageView=1;
      req.session.login=true;
      res.send({message:`welcome ${user.username}`})
  }
})
//user logout
exports.logout=expressAsyncHandler(async (req,res)=>{
  req.session.login=false;
  req.session.destroy(()=>{
    res.send({message:"Logged out successfully"})
  })
})
//modify-user
exports.modifyUser=expressAsyncHandler(async (req,res)=>{
  if(req.headers.cookie==undefined){
    res.send({message:"unauthorised access"})
  }
  else if(req.session.username==undefined){
    res.send({message:"login again to continue"})
  }
  else{
    //let {username,password}=req.body
    let [upd]=await User.update({"password":req.body.password},{where:{"username":req.body.username}})
    res.send({message:"updated user details"})
  }
})
//get user details
exports.users=expressAsyncHandler(async (req,res)=>{
  let users=await User.findAll()
  res.send({message:"users",payload:users})
})
/*
//import model
const {User}=require("../db/models/user.model");
const sequelize=require("../db/db.config");
const bcryptjs=require("bcryptjs");
//import expressasync handler
const expressAsyncHandler=require("express-async-handler");

exports.Registration=expressAsyncHandler(async(req,res)=>{
    let {username,password}=req.body;
    //find duplicate user
    let user=await User.findOne({where:{"username":username,"password":password}});
    if(user!=undefined){
        res.send({message:"user already registered"})
    }
    else{
        let hashedpassword=await bcryptjs.hash(password,5);
        password=hashedpassword;
        await User.create(username,password);
        res.send({message:"user registered with hashed password"})
    }

})*/