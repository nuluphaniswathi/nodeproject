//importing express module
const express=require("express")
//creating mini router
const StudentApp=express.Router();

const{createStudent,getStudents,createAddress,createSemestermarks,createMarksbyRoll,updateAddress,
    updateMarks,deleteStudent,getAggregate,getStudentByRoll}=require("../controllers/student.controller");
//body parser
StudentApp.use(express.json());
StudentApp.post("/student",createStudent);
StudentApp.get("/students",getStudents);
StudentApp.get("/students/:roll_no",getStudentByRoll)
StudentApp.post("/student/:roll_no/address",createAddress)
StudentApp.post("/semister",createSemestermarks);
StudentApp.get("/student/:roll_no/sem-marks",createMarksbyRoll)


StudentApp.put("/student/:roll_no/new-address",updateAddress)
StudentApp.put("/student/:roll_no/semester/:semister_id/new-marks",updateMarks)
StudentApp.delete("/student/:roll_no",deleteStudent)
StudentApp.get("/students-with-aggregate",getAggregate)

module.exports=StudentApp;