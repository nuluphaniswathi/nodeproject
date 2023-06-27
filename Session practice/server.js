//import express
const exp=require("express");
//call exp application
const app=exp();

app.listen(4000,()=>console.log("server running on port 4000"))
app.use(exp.json())
//import dotenv
require("dotenv").config();

//import mysql
//const mysql=require("mysql2");
//import sequelize
const sequelize=require("./db/db.config");
//sequelize connection
sequelize.authenticate()
.then(()=>console.log("connection established"))
.catch((err)=>console.log("error occured",err))

const session=require("express-session")
const MySqlStore=require("express-mysql-session")(session)
//to communicate with each other session is passed as an arg
//it returns a constructor which needs to be instantiated, so naming convention is upper camelcase
// initalize sequelize with session store
//const expressSession = require('express-session');
//const SessionStore = require('express-session-sequelize')(expressSession.Store);
let SequelizeStore = require("connect-session-sequelize")(session.Store);
//configure express session
//session is application level middleware
app.use(session({
  secret:'secretkeyadsdfv',
  saveUninitialized:false,
  resave:false,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie:{
    maxAge:60000
  }
})
)

//import userapp
const userApp=require("./routes/user.route");
app.use("/user-api",userApp);

//error handling middleware
app.use("*",(req,res,next)=>{
    res.send({message:"invalid path"})
})
//default error middleware
app.use((err,req,res,next)=>{
  res.send({"error":err.message})
})