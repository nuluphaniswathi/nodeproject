const express=require("express");
const productApp=express.Router();
//importing controller
const {products,getProducts}=require("../controllers/product.controller.js")

productApp.use(express.json())
productApp.post("/product",products);
productApp.get("/product",getProducts)

module.exports=productApp