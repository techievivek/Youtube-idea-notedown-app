const express=require("express")
const exphbs=require("express-handlebars")
const mongoose = require('mongoose')
const bodyParser=require("body-parser")
const methodOverride=require("method-override")
const flash=require("connect-flash")
const session=require("express-session")
//Load routes
const ideas=require("./routes/ideas")
const uri ="mongodb://localhost/videjot-dev"
const user=require("./routes/users")
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{console.log("Connected Successfully")}).catch((err)=>{console.log("Error Connecting to Database")})
const app=express()
const port=5000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())
//GLobal variable
app.use((req,res,next)=>{res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
res.locals.error=req.flash('error');
next();
})
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.get('/',(req,res)=>{
    const title="Welcome1"
    res.render('index',{title:title})
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.send('Contact')
})
app.listen(port,()=>{
    console.log(`Sever started on port: ${port}`)
})
app.use('/idea',ideas)
app.use('/user',user)
