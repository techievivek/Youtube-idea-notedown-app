const mongoose=require("mongoose")
const Schema=mongoose.Schema
const newuser=new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now()
    }
})
mongoose.model("users",newuser)