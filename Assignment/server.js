//importing express module
const exp=require("express");

//creating application
const app=exp();

//import dotenv
require("dotenv").config();

//listening to port number
const port=process.env.PORT||4000;
app.listen(port,()=>console.log("port is running on 4000"));

//bodyparser
app.use(exp.json());

//importing studentApp
const StudentApp=require("./Routes/student.route")
app.use("/student-api",StudentApp)

//importing
const sequelize=require("./db/db.inventory.js");
//const StudentApp = require("./Routes/student.route.js");

//establlishing db connection using sequelize
sequelize.authenticate()
.then(()=>console.log("DB conection is suceess"))
.catch(err=>console.log("err in DB connection",err))
//body parse
app.use(exp.json());



//invalid path middleware
app.use("*",(req,res,next)=>{
    res.send({message:"invalid path"})
})

//errror handling middleware
app.use((err,req,res,next)=>{

    res.send({"errMsg":err.message});
})

