const express=require('express');
const app=express();
const port=3000;
app.get('/',(req,res)=>{
res.send=("ok");
})
app.listen(port,(req,res)=>{
    console.log("server is conected")
})
app.get('user',(req,res)=>{
    console.log("userpage")
})
const moongose=require('moongose');
moongose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connect to moongose"))
.catch(err=>console.error("have a problem to connect",err))


const userschema=new moongose.userschema({
    name:String,
    email:String,
    password:String,
})
const user=moongose.model('user',userschema)


const request=require('supertest');
const app=require('./app');
describe('GET/',()=>{
    it("respawn withe hello world",(done)=>{
        request(app).get('/').expect('hello world',done)
      })
})