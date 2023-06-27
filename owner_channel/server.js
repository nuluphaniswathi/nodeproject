//import express module
const exp=require("express");

//app
const app=exp();
//dotenv
require("dotenv").config();
//assigning port number
const port=process.env.PORT||4000;
app.listen(port,()=>console.log("port is running on 4000"));
app.use(exp.json());

const sequelize=require("./db/db.config");

//test the DB connection it returns promise
//no need to import mysql2 sequelize can take care of it but we need to install
sequelize.authenticate()
.then(()=>console.log("DB conection is suceess"))
.catch(err=>console.log("err in DB connection",err))


//import routes
const OwnerApp=require("./routes/owner.route");
app.use("/owner-api",OwnerApp);



//invalid path middleware
app.use("*",(req,res,next)=>{
    res.send({message:"invalid path"})
})

//errror handling middleware
app.use((err,req,res,next)=>{

    res.send({"errMsg":err.message});
})

