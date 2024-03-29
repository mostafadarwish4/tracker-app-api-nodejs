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
const mongoUri='your mongoDB uri'

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
app.use(authRoutes)
app.use(trackRoutes)

app.listen(port,()=>{
    console.log('server started at port 5000')
})