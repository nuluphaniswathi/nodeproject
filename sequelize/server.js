//create express app
const exp=require("express");
const app=exp();
require("dotenv").config();
//assigning port number
//import sequelize
const sequelize=require("./db/db.config")
const expressAsyncHandler=require("express-async-handler");

//import emp model
const { Emp }=require("./models/emp.model.js");

//import job model
const { Job }=require("./models/job.model.js");

//import persons model
const { Persons }=require("./models/persons.model.js");

//import accounts model
const { Accounts }=require("./models/account.model.js");

//import skills model
const { Skills }=require("./models/skills.model.js");

//import address model
const { Address }=require("./models/address.model.js");

//import users
const { Users }=require("./models/users.model.js");

//import contactdetails
const {ContactDetails}=require("./models/contact_details.model.js")






// const Customer=require("./models/customer.model")
//named export
//let {Customer}=require("./models/customer.model");
//let {User}=require('./models/user.model.js');

// let {Person}=require('./models/person.model.js');
// let {Skill}=require('./models/skill.model.js');
//let {User}=require('./models/user.model.js');
//op gives all operators import it from sequelize
const {Op, Sequelize}=require("sequelize");
const port=process.env.PORT||4000;
app.listen(port,()=>console.log("port is running on 4000"));
//DB


//test the DB connection it returns promise
//no need to import mysql2 sequelize can take care of it but we need to install
sequelize.authenticate()
.then(()=>console.log("DB conection is suceess"))
.catch(err=>console.log("err in DB connection",err))
//body parse
app.use(exp.json());
//create table for all models

sequelize.sync({force:true})

//Establishing one to one mapping between emp and job
Emp.Job=Emp.hasOne(Job,{foreignKey:{name:"emp_id",allowNull:false}});//mandatory
//return association object
//Job.belongsTo(Emp,{foreignKey:{name:"empId"}});//optional
//automatically create foreign key

//routes for emp and job model
//create employee
app.post("/create-emp",expressAsyncHandler(async(req,res)=>{
    //get data request body
    //let{emp_id,emp_name,job_id,job_desc}=req.body
    //save emp data to emp table
    //let emp= await Emp.create({emp_id:emp_id,emp_name:emp_name})
    //save job data to job table
    //let job=await Job.create({job_id:job_id,job_desc:job_desc})
    //set job to emp
    //emp.setJob(job)
    //it uses update command to set job for matched employee

    //send response
    //res.send({message:"employee created"})
    await Emp.create(req.body,{
        include:[
            {
                association:Emp.Job
            },
        ],

    });
    res.send({message:"Emp created"});
}));

//create job

app.post("/create-job",
    expressAsyncHandler(async(req,res)=>{
    console.log(req.body.emp_id);
    if(req.body.emp_id!=undefined){
        res.send({message: "job created"});
    }
    else{
        res.send({message:"cannot create job without employee"});
    }
   
    })
);

//get employee details
app.get("/emps",expressAsyncHandler(async(req,res)=>{
    let emps=await Emp.findAll({include:{
        model:Job,
        attributes:['job_desc']
    }});
    //let [emps]=await Emp.findAll();
    //console.log(emp.toJSON());
    //condition
    //let jobs=await emps.getJob();
    //console.log(jobs);
    res.send({ message :" Employees details",payload:emps});
}))

//ONE TO MANY RELATIONSHIP BETWEEN PERSON AND ACCOUNTS
//console.log(Person);
Persons.Accounts= Persons.hasMany(Accounts,{foreignKey:{name:"custId", allowNull:false}});


//routes for person and accounts
app.post("/create-persons",expressAsyncHandler(async(req,res)=>{
    await Persons.create(req.body,{
        include:[
            {
                association: Persons.Accounts
            },
        ],
    });
    res.send({ message: "customer created"});

}));

//USER-->ADDRESS
//one to one relationship
Users.Address=Users.hasOne(Address,{ foreignKey:"userid",allowNull:false});

//USER-->SKILLS
//ONE TO MANY RELATIONSHIP
Users.Skills=Users.hasMany(Skills,{foreignKey:"userid",allowNull:false});

Address.ContactDetails=Address.hasOne(ContactDetails,{foreignKey:{name:"userId",allowNull:false}});

console.log("assocation:",Address.ContactDetails);

//route
app.post("/creating-user",expressAsyncHandler(async(req,res)=>{
    await Users.create(req.body,{
        include:
        [
            {
                association:Users.Address,
                include:[
                    {
                        association:Address.ContactDetails
                    }
                ],
            },
            {
                association:Users.Skills
            },
        ],
    });
    res.send({message: " User created"})
}))

//get users
app.get("/users",expressAsyncHandler(async(req,res)=>{
    let [users]=await Users.findAll({include:[
        {
            model:Address,
        }
    ]})
    let [contact]=await Address.findAll({include:[
        {
        model:ContactDetails
        }
    ]})
    console.log(contact)
    res.send({message:"User details",payload:[users,contact]})
}));















//routes
//creating person for person model
app.post('/create-person',expressAsyncHandler(async(req,res)=>{
    await Person.create(req.body);
    res.send({message:"New person created"})
}));
//creating skill for skill model
app.post('/skill',expressAsyncHandler(async(req,res)=>{
    await Skill.create(req.body);
    res.send({message:"person with skill created"});
}));

app.post('/create-user',expressAsyncHandler(async(req,res)=>{
    //await Customer.sync()//it created customer table if not exits otherwise does nothing if exists it is safe to use
    //get customer from client

   //let newCustomer =req.body;
   //creae row for newCustomer row
//    let cust=Customer.build(req.body)/get-customer
//    console.log(cust.toJSON())
//    //insert int DB
//    await cust.save()
//instead of using build and save use create method it is combo of build and save
    //await Customer.create(req.body);
    await User.create(req.body);
   res.send({message:"New Customer created"})
}));

app.get("/get-user",expressAsyncHandler(async(req,res)=>{
    //find all internall executes the select command in model sequelize
    let users=await User.findAll();
    res.send({message:"all users",payload:users});
    console.log(users);

}));

// app.get("/get-customer",expressAsyncHandler(async(req,res)=>{
//     //find all internall executes the select command in model sequelize
//     let customers=await Customer.findAll({
//         where:{
//             customer_id:{
//                 [Op.ne]:100

//             }
//         }
//     });
//     res.send({message:"all customers",payload:customers});
//     console.log(customers);

// }));
//find by primarykey
app.get('/customer/:customer_id',expressAsyncHandler(async(req,res)=>{
    let customer=await Customer.findByPk(req.params.customer_id)
    res.send({message:"One customer",payload:customer});
}));
//find by non-key
app.get("/customer/name/:customer_name",expressAsyncHandler(async(req,res)=>{
     let customer=await Customer.findOne({
         where:{customer_name:req.params.customer_name}
     });
    //let customer=await Customer.findOne(); it gives the first entry when argument is not provided
    res.send({message:"One customer",payload:customer});

}));
//update
app.put("/update-customer",expressAsyncHandler(async(req,res)=>{
    //update method gives number it shows howmany rows are modified;
    let updateCount=await Customer.update(req.body,{where:{
        customer_id:req.body.customer_id
    }})
    console.log(updateCount);
    if(updateCount==0)
    {
        res.status(404).send({message:"No update"});
    }
    else{
        res.status(200).send({message:"Customer updated"});
    }

}));
app.delete('/delete-customer/:cust_id',expressAsyncHandler(async(req,res)=>{
    let deleteCount=await Customer.destroy({where:{customer_id:req.params.cust_id}});
    console.log(deleteCount);
    if(deleteCount==0)
    {
        res.send({message:"No Customer found to delete"})
    }
    else
    {
        res.send({message:"Customer deleted with that id"})
    }
}));
//error handline middleware
app.use((err,req,res,next)=>{
    let errmsg=err.message.split("\n");

    res.send({errMsg:errmsg});
})
