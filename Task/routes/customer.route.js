const express=require("express");
const  CustomerApp=express.Router();
//importing controller
const {Customers,getCustomers,writeReview,getAllReviews,getCustomerReview,getCustomerOrders,createCustomerOrders
,test}=require("../controllers/customer.controller.js")
CustomerApp.use(express.json())
//CustomerApp.get("/create",Customers)
CustomerApp.post("/customer",Customers);
CustomerApp.get("/customer",getCustomers);
CustomerApp.post("/customer-review",writeReview)
CustomerApp.get("/customer-review",getAllReviews)
CustomerApp.get("/customer-review/:cust_id",getCustomerReview)
CustomerApp.get("/customer-order/:cust_id",getCustomerOrders)
CustomerApp.post("/customer-order",createCustomerOrders)
CustomerApp.post("/test",test);
module.exports= CustomerApp