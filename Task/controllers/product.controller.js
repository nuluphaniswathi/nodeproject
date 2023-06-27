const express=require("express");
const expressAsyncHandler=require("express-async-handler");
const {Product}=require("../db/models/product.model")
exports.products=expressAsyncHandler(async(req,res)=>{
    await Product.create(req.body);
    res.send({message:"product created"})
})
exports.getProducts=expressAsyncHandler(async(req,res)=>{
    let getproducts=await Product.findAll();
    res.send({message:"products",payload:getproducts})
})
//module.exports=products;