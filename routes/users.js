const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
require("../models/user")
const User=mongoose.model("users")
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.get('/login',(req,res)=>{
    res.render("users/login")
    })
    router.post('/login',(req,res)=>{
        res.send("login")
    })
    router.get('/signup',(req,res)=>{

        res.render("users/signup")
    })
    router.post('/signup',(req,res)=>{
        const user_data={
            email:req.body.email,
            username:req.body.username,
            password:req.body.password
        }
       const  error=[]
       if(!req.body.email)
       {
error.push({text:"Email field in empty"})
       }
       if(!req.body.username)
       {
error.push({text:"Username field is empty"})
       }
       if(!req.body.password)
       {
error.push({text:"Password field is empty"})
       }
       if(error.length>0)
       {
res.render("users/signup",{error:error,user_data})
       }
       else
       {
        const email=req.body.email;
        User.findOne({
            email:email
        })
        .then(user=>{
            if(user)
            {
error.push({text:"Account Already Exist"})
res.render("users/signup",{error:error,user_data})
            }
            else
            {
new User(user_data)
.save()
.then(()=>{res.redirect("/idea/add")})
            }
        })
       }
    })
module.exports=router;