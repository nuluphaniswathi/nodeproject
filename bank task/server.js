//import express
const exp=require("express");
//call exp application
const app=exp();

app.listen(4000,()=>console.log("server running on port 4000"))
app.use(exp.json())
//import dotenv
require("dotenv").config();

//import sequelize
const sequelize=require("./db/db.config");
//sequelize connection
sequelize.authenticate()
.then(()=>console.log("connection established"))
.catch((err)=>console.log("error occured",err))


const AccountApp=require("./routes/account.route");
app.use("/account-api",AccountApp);

//error handling middleware
app.use("*",(req,res,next)=>{
    res.send({message:"invalid path"})
})
//default error middleware
app.use((err,req,res,next)=>{
  res.send({"error":err.message})
})