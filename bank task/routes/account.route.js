const exp=require("express");
const AccountApp=exp.Router();

const{CreateUserAccount,DepositAmount,WithdrawAmount,transfer
}=require("../controllers/account.controller")

//body parser
AccountApp.use(exp.json());
AccountApp.post("/create-user",CreateUserAccount);
AccountApp.put("/deposit",DepositAmount);
AccountApp.put("/withdrawl",WithdrawAmount);
AccountApp.put("/transfer/userA/:acc1/userB/:acc2/amount/:amount",transfer)

module.exports=AccountApp;