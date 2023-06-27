//importing student model in controllers
const {Student}=require("../db/models/student.model");
//importing Address model in controllers
const {Address}=require("../db/models/address.model");
//importing semister model in controllers
const {Semister}=require("../db/models/semester.model");

//import op
const {Op}=require("sequelize")


//importing express async handler
const expressAsyncHandler=require("express-async-handler");
//import sequelize
const sequelize = require("../db/db.inventory");



//establishing one to one association between student and addres
Student.Address=Student.hasOne(Address,{foreignKey:"roll_no",allowNull:false})
Address.Student=Address.belongsTo(Student,{foreignKey:"roll_no",allowNull:false})


//establishing has many relationship  students and semester marks
Student.Semister=Student.hasMany(Semister,{foreignKey:"roll_no",allowNull:false});

//creating student
exports.createStudent=expressAsyncHandler((async(req,res)=>{
    await Student.create(req.body);
    res.send({message:"student created"});
}));
//get all students details with given format
exports.getStudents=expressAsyncHandler((async(req,res)=>{
    let students=await Student.findAll({
        where:{status:true},
        include:[
            {
                model:Semister,
                attributes:{exclude:["roll_no"]}
            },
            {
                model:Address,
                attributes:{exclude:["address_id","roll_no"]}
            }
        ],
        attributes:{exclude:["dob","status"]}
    });
    res.send({message:"Student details",payload:students})
}))
//creating address for specific roll no person
exports.createAddress=expressAsyncHandler((async(req,res)=>{
    //take roll no of the students
    let address=await Address.create(req.body);
    res.send({message:"Address added",payload:address.dataValues})
    
}));
exports.getAddress=expressAsyncHandler((async(req,res)=>{
    let address=await Student.findAll();
    res.send({message:"display address",payload:address});
}))
exports.createSemestermarks=expressAsyncHandler(async(req,res)=>{
   let semmarks= await Semister.create(req.body);
    res.send({message:"semister marks created",payload:semmarks.dataValues});
});

exports.getStudentsbyRoll=expressAsyncHandler(async(req,res)=>{
    let roll=await Student.findAll({where:{roll_no:req.params.roll_no}})
    res.send({message:"student details by roll no",payload:roll});

})
/*
exports.getMarksbyRoll=expressAsyncHandler(async(req,res)=>{
    let roll=await Student.findAll({where:{roll_no:req.params.roll_no}})
    res.send({message:"marks of given roll no",payload:roll});
})*/
exports.createMarksbyRoll=expressAsyncHandler(async(req,res)=>{
    let roll=await Student.findAll({where:{roll_no:req.params.roll_no}})
    if(roll)
    {
        await Semister.create(req.body);
        res.send({message:"marks created for given roll no"})
    }
})
//update student address
exports.updateAddress=expressAsyncHandler(async(req,res)=>{
    let student=await Student.findOne({where:{[Op.and]:[
        {"roll_no":req.params.roll_no},
        {"status":true}
    ]}})
    if(student){

    await Address.update(req.body,{where:{"roll_no":req.params.roll_no}})
    }
    else{
        res.send({message:"no student to update"})
    }
    res.send({message:"address updated"})
})
//update student marks
exports.updateMarks=expressAsyncHandler(async(req,res)=>{
    // let student=await Student.findOne({where:{[Op.and]:[
    //     {"roll_no":req.params.roll_no},
    //     {"status":true}
    // ]}})
    // console.log("student",student);
    // if(student){
        await Semister.update(req.body,
            {where:
                {"roll_no":req.params.roll_no,
                "semister_id":req.params.semister_id}})
   // }
    // else{
    //     res.send({message:"no student to update the address"})
    // }
    res.send({message:"marks updated"})
})

//delete student 
exports.deleteStudent=expressAsyncHandler(async(req,res)=>{
    let rollno=req.params.roll_no;
    await Student.update({status:"false"},{
        where:{roll_no:rollno}
    })
    res.send({message:"deleted"});
})

exports.getAggregate=expressAsyncHandler(async(req,res)=>{
    let aggregatepercentage=await sequelize.query
    ('select (res.totalmarks/(180* res.noOfSems)*100) as aggregatepercentage  from (select count(distinct semister_id) as noOfSems,sum(maths+Physics+Chemistry) as totalmarks from semisters group by roll_no)as res'
    ,{
        type:sequelize.QueryTypes.SELECT
    });
    res.send({message:"student with thier aggregate",payload:aggregatepercentage})
})
//get student by roll
exports.getStudentByRoll=expressAsyncHandler(async(req,res)=>{
    let roll=await Student.findAll(
        {where:{"roll_no":req.params.roll_no},
        include:[
        {
            model:Semister,
            attributes:{exclude:["roll_no"]}
        },
        {
            model:Address,
            attributes:{exclude:["address_id","roll_no"]}
        }
        ],
        attributes:{exclude:["dob","status"]}
    });
    res.send({message:"get student details",payload:roll});
    
})
