const expressAsyncHandler=require("express-async-handler");
//importing model
const {Accounts}=require("../db/models/account.model");
const {Op}=require("sequelize");
const sequelize=require("../db/db.config");


//creating user account
exports.CreateUserAccount=expressAsyncHandler(async(req,res)=>{
    await Accounts.create(req.body);
    res.send({message:"user created"});
})

//making deposit to the user account
exports.DepositAmount=expressAsyncHandler(async(req,res)=>{
    //for finding existed amount of that account
    let Original=await Accounts.findOne({where:{[Op.and]:[
        {"account_no":req.body.account_no},
        {"username":req.body.username}
    ]}})
    console.log(Accounts);
    console.log("Original amount:",Original.amount);
    let existedAmount=Original.amount;
    //depositing amount
    let amount=req.body.amount;
    console.log(amount);
    if(!(amount>=1000 && amount<=10000)){
        res.send({message:"deposit amount should be in between 1000 and 10000 inclusive"})
    }
    else{
        //let updatedAmount=Accounts.amount+amount
        let data=await Accounts.update({"amount":amount+existedAmount},{where:{"account_no":req.body.account_no}})
        res.send({message:"deposit done",payload:Accounts});
    }
})
//making withdraw operation
exports.WithdrawAmount=expressAsyncHandler(async(req,res)=>{

    //for finding existed amount of that account
    let Original=await Accounts.findOne({where:{[Op.and]:[
        {"account_no":req.body.account_no},
        {"username":req.body.username}
    ]}})
    let existedAmount=Original.amount;
    let WithdrawAmount=req.body.amount;
    if(WithdrawAmount>25000)
    {
        res.send({message:"withdraw limit exceeded"})
    }
    else{
        if(existedAmount<WithdrawAmount){
            res.send({message:"you dont have sufficient amount"})
        }
        else{
        let updatedAmount=await Accounts.update({"amount":existedAmount-WithdrawAmount},{where:{"account_no":req.body.account_no}})
        res.send({message:"withdraw success"})
        }
    }

})
//making transfer 25000 from userA to userB
/*
exports.AmountTransfer=expressAsyncHandler(async(req,res)=>{
    let userAamount=req.params.userA_amount;
    console.log(userAamount);
    let UserB=await Accounts.findOne({where:
        {"account_no":req.body.account_no},
    })
    let UserBexistedAmount=UserB.amount;
    console.log(UserBexistedAmount);
    let updatedAmount=(+userAamount)+(+UserBexistedAmount);
    console.log(+updatedAmount);
    await Accounts.update({"amount":+updatedAmount},{where:{"account_no":req.body.account_no}})
    res.send({message:"transfer success"});
})*/
exports.transfer=expressAsyncHandler(async (req,res)=>{
    const t=await sequelize.transaction();
    try{
      //check if acc1 exists
      let account1=await Accounts.findOne({where:{"account_no":req.params.acc1}},{ transaction: t })
      if(account1==undefined){
        res.send({message:`account with account number ${req.params.acc1} does not exist`})
      }
      //check if account 2 exists
      let account2=await Accounts.findOne({where:{"account_no":req.params.acc2}},{ transaction: t })
      if(account2==undefined){
        res.send({message:`account with account number ${req.params.acc2} does not exist`})
      }
      //check if tranfer money is greater than balance
      if(account1.amount<req.body.amount){
        res.send({message:`insufficient balance in ${account1.account_no}`})
      }
      //else
      //transfer money from A to B
      else{
      await Accounts.update({"amount":account1.amount-req.body.amount},{where:{"account_no":req.params.acc1}, transaction: t })
      //transaction obj should be second arg
      //throw new Error();
      await Accounts.update({"amount":account2.amount+req.body.amount},{where:{"account_no":req.params.acc2},transaction:t})
      let account11=await Accounts.findOne({where:{"account_no":req.params.acc1}, transaction: t })
      let account22=await Accounts.findOne({where:{"account_no":req.params.acc2}, transaction: t })
      res.send({message:`money transfered from ${account11.account_no} to ${account22.account_no},current balance in ${account11.account_no}:${account11.amount}, current balance in ${account22.account_no}:${account22.amount}`})
      await t.commit()
    }
    }
    catch(err){
      await t.rollback()
      res.send({"error":err})
    }
  })