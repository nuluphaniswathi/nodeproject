const exp=require("express");
const userApp=exp.Router();

const{registerUser,loginUser,logout,modifyUser,users
}=require("../controllers/user.controller")

//body parser
userApp.use(exp.json());

userApp.post("/registration",registerUser);
userApp.post("/loginUser",loginUser);
userApp.get("/logout",logout);
userApp.put("/modify-user",modifyUser);
userApp.get("/get-users",users);



module.exports=userApp;