const EventEmitter=require("events");

//create own event=custome event
let myEvent=new EventEmitter()

//register event listener using on or addeventlistener
myEvent.on('hello',(message)=>{
    console.log("hello called",message)
})

//call emit method on event listener to execute==>child to parent communicate
myEvent.emit('hello','good afternoon')
