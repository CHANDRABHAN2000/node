
const express=require("express");
const server=express();
const morgan=require('morgan');
var mongoose=require('mongoose');
const cors=require('cors');
const session = require('express-session');

const bodyParser = require("body-parser") 

mongoose.connect('mongodb://localhost:27017/todolist', {useNewUrlParser: true});

const Schema= mongoose.Schema;
const taskSchema= new Schema({
    title: {type: String},
    status: {type: Boolean},
  

});

const Task = mongoose.model('Task', taskSchema);

server.use(bodyParser.json());   
server.use(bodyParser.urlencoded({ extended: false }))

server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  
  }))
server.use(express.static('build'));
server.use(morgan('combined'));
server.use(cors());



server.post("/task",(req,res)=>{
 var task= new Task();

 task.title= req.body.title;
 task.status= req.body.status;
 

 task.save().then((doc)=>{ res.json(doc);
 }
 
 )

})





server.put("/task/:id",(req,res)=>{
  Task.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,doc)=>{
    console.log(doc);

    res.json(doc);
  })
  
  
})



server.delete("/task/:id",(req,res)=>{
Task.findOneAndDelete({_id:req.params.id})
.then((err,doc)=>{
  console.log(doc);
  res.json(doc);
})
})








server.listen(8080,()=>{
    console.log("server started");

})