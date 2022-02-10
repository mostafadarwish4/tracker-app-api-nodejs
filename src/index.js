require('./models/user')
require('./models/tracks')
const express=require('express')
const app =express()
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')
const trackRoutes=require('./routes/trackRoutes')
const bodyParser=require('body-parser')

const requireAuth = require('./middlewares/requireAuth')

app.use(express.json())
const port=process.env.port || 5000
const mongoUri='mongodb+srv://admin:passwordpassword@cluster0.6ol9d.mongodb.net/test?retryWrites=true&w=majority'
//mongodb+srv://admin:passwordpasswor@cluster0.6ol9d.mongodb.net/test?retryWrites=true&w=majority
  mongoose.connect(mongoUri,{ 
      useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo instance')
});

mongoose.connection.on('error',(err)=>{
    console.error('Error connectiong to mongo',err)
})
app.get('/',requireAuth,(req,res)=>{
    res.send(` your email is ${req.user.email}`)
})
app.get('/',(req,res)=>{
    res.send('Welcome to Tracks API')
})
app.use(authRoutes)
app.use(trackRoutes)

app.listen(port,()=>{
    console.log('server started at port 5000')
})