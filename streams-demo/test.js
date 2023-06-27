const fs=require("fs");
const fetch=require("node-fetch")
//here we need to wait untill the whole data is loaded and then we process it
const readFileNormally=()=>{
    //error first callback function
    fs.readFile('./sample.txt',(err,data)=>{
        if(err){
            console.log("err is ",err)
        }
        else{
            console.log(data.toString());
        }
    })
}
//readFileNormally();
//without waiting the entire is loading using buffer we can process our data
const readFileWithStream=()=>{
    //create readable stream
    let readStream=fs.createReadStream('./sample.txt');
    //create writable stream
    let writeStream=fs.createWriteStream('./data.txt');
    //once data filled in buffer it has to flushed data stored like chunk
            //evebt type is data 
    readStream.addListener('data',(chunk)=>{
        //writeStream.write(chunk)
        console.log(chunk.toString().length)
    })
}
//readFileWithStream();

const getDataFromApi=async()=>{
    let writeStream=fs.createWriteStream('./data1.txt')
    let res=await fetch("https://jsonplaceholder.typicode.com/users")
    let dataStream=res.body;
    //wait until the datastream takes the data and then proceed
    //res.body gives readable stream
    for await(chunk of dataStream)
    {
        //console.log(Buffer.from(chunk).toString())
        writeStream.write(Buffer.from(chunk).toString())
    }

}
getDataFromApi();