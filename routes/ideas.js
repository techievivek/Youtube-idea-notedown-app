const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
require('../models/Idea')
const Idea=mongoose.model("ideas")
router.get('/add',(req,res)=>{
    res.render('ideas/add')
})
//Process Form
router.post('/add',(req,res)=>{
    error=[]
    if(!req.body.title)
    {
error.push({text:"Please Add a Title"})
    }
    if(!req.body.content)
    {
        error.push({text:"Please Add Some Content"})
    }
    if(error.length>0)
    {
res.render("ideas/add",{errors:error,title:req.body.title,content:req.body.content})
    }
    else
    {
        const newIdeas={
            title:req.body.title,
            details:req.body.content
        }
new Idea(newIdeas).
save()
.then(idea=>{req.flash('success_msg',"Vide Idea Added"); res.redirect('/list')})
    }
})
router.get('/list',(req,res)=>{
    Idea.find()
    .sort({date:'desc'})
    .then((ideas)=>{res.render('ideas/list',{ideas:ideas})})
    
})
router.get('/edit/:id',(req,res)=>{
    id=req.params.id
    Idea.findOne(
        {
            _id:id
        }
    ).then(idea=>{res.render('ideas/edit',{idea:idea})})
    
})
router.put('/edit/:id',(req,res)=>{
    id=req.params.id
    Idea.findOne({
        _id:id
    })
    .then((idea)=>
    {
idea.title=req.body.title;
idea.details=req.body.content;
idea.save()
.then(idea=>{req.flash('success_msg',"Vide Idea Updated");res.redirect("/idea/list")})
    })
})
router.delete('/delete/:id',(req,res)=>{
    Idea.deleteOne({
        _id:req.params.id
    })
    .then(()=>{req.flash('success_msg',"Vide Idea Removed"); res.redirect('/idea/list')} )
})
module.exports=router