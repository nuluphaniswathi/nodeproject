const exp=require("express");
const OwnerApp=exp.Router();
//body parser
OwnerApp.use(exp.json())
const {createOwner,getData}=require("../controllers/owner.controller");
const { Owner } = require("../db/models/owner.model");
OwnerApp.post("/create-owner",createOwner);
OwnerApp.get("/get-details",getData)



module.exports=OwnerApp;
