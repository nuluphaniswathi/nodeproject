const exp=require("express");
const app=exp();
app.listen(4000,()=>console.log("port runing"));

const fs=require("fs");
const fetch=require("node-fetch")

app.get("/read-file-normally",(req,res)=>{

     //error first callback function
     fs.readFile('./sample.txt',(err,data)=>{
        if(err){
            console.log("err is ",err)
        }
        else{
            res.send(data.toString());
        }
    })
    

})
app.get("/read-file-streams",async(req,res)=>{
    let read=fs.createReadStream('./data1.txt');
    //pipe is used to connect two either readable 
    //here readable stream connected to writable stream response
    read.pipe(res)
})