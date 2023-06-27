
const expressAsyncHandler=require("express-async-handler");
//importing customer model
const {Customer}=require("../db/models/customer.model")
//importing review model
const {Review}=require("../db/models/review.model")
//importing product model
const {Product}=require("../db/models/product.model")
//importing orders model
const {Orders}=require("../db/models/order.model.js");
//importing Address model
const {Address}=require("../db/models/Address.model.js");
const sequelize = require("../db/inventory.db");


//establishing associations between customer and product through review
Customer.Product=Customer.belongsToMany(Product,{through:"model", foreignKey:"cust_id"})
Product.Customer=Product.belongsToMany(Customer,{through:"model",foreignKey:"product_id"})

//establishing association between customer and product through order
Customer.Product=Customer.belongsToMany(Product,{through:Orders,foreignKey:"cust_id"})
Product.Customer=Product.belongsToMany(Customer,{through:Orders,foreignKey:"product_id"})

console.log("customer-products",Customer.Product)



//establishing one to one association between customer and addres
Customer.Address=Customer.hasOne(Address,{foreignKey:"customer_id",allowNull:false})
Address.Customer=Address.hasOne(Customer,{foreignKey:"customer_id",allowNull:false})

//creating customer
exports.Customers=expressAsyncHandler(async(req,res)=>{

    //create customer with address if customer already existed then add address
    //else add both customer and address to both tables
    let cust=await Customer.findOne({where:{"customer_email":req.body.customer_email}});
    console.log(email)
    
    //let cust_id=await Customer.findByPk({"customer_id":req.params.customer_id})
    //console.log(email);
    if(cust==undefined)
    {
    await Customer.create(req.body,{
        include:
        [
            {
                association:Customer.Address
            }
        ]
    });
    
    }
    else{
        //check if customer already has address
        let add=await Customer.getAddress();
        if(add==null){
            let {street,city,state,pincode}=req.body.address
            let addr= await Address.create({"street":street,"city":city,"state":state,"pincode":pincode})
            email.setAddress(addr)
        }
        else{
            res.send("person having that address already existed");
        }
    }
    res.send({message:"customer created"})
})
exports.createCustomerOrders=expressAsyncHandler(async(req,res)=>{
    await Orders.create(req.body,{
        include:[
            {
                association:Customer.Product
            }
        ]
    })
    res.send({message:"orders created"});
})

//get customer orders
exports.getCustomerOrders=expressAsyncHandler(async(req,res)=>{
    //get customer id from req.params
    let cust_id=req.params.cust_id
    let getCustomerOrders=await Orders.findAll({attributes:{exclude:["customer_id"]},where:{"customer_id":cust_id}});
    res.send({message:"orders",payload:{"cusomer_id":cust_id,"orders":getCustomerOrders}});
})
exports.getCustomers=expressAsyncHandler(async(req,res)=>{
    let getcustomers=await Customer.findAll();
    res.send({message:"customers",payload:getcustomers});
})

//creating customer review
exports.writeReview=expressAsyncHandler(async(req,res)=>{
    await Review.create(req.body,{
        include:[
            {
                association:Customer.Product
            }
        ]
    })
    res.send({message:"review done"})
})
exports.getAllReviews=expressAsyncHandler(async(req,res)=>{
    let [getAllReviews]=await Review.findAll();
    res.send({message:"customer with their review",payload:getAllReviews})
})
exports.getCustomerReview=expressAsyncHandler(async(req,res)=>{
    let cust_id=req.params.cust_id;
    let reviews=await Review.findAll({attributes:{exclude:["customer_id"]},where:{"cust_id":cust_id}})
    res.send({message:"reviews",payload:{"customer_id":cust_id,"review":reviews}})
})
/*
const customer=(req,res)=>{
    res.send("customer created")
}
module.exports=customer;*/
exports.test=expressAsyncHandler(async(req,res)=>{
    const t=await sequelize.transaction();
    try{
        const user=await User.create({
            firstName:"swathi",
            lastName:"nulu"
        },{transaction :t});
        await user.addSibling({
            firstName:'Lisa',
            lastName:'nulu'
        },{transaction: t});
        await t.commit();
    }
    catch(error){
        await t.rollback();
    }
});

