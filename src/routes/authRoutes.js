const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')


const User=mongoose.model('User')
router.post('/signUp',async(req,res)=>{
    const {email,password}= req.body
    try{
        const user=new User({email,password})
        await user.save()
        const token=jwt.sign({userId:user._id},'MY_SECRET_KEY')
        res.send({token})
    }catch(err){
        //it will return an exception that will be handeled in react-native app coode
        res.status(422).send(err.message)
    }
    //console.log(req.body)
});
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.status(402).send('email or password must be provided')
    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(402).send('email or password not valid')
    }
    try{
        await user.comparePassword(password)
        const token = jwt.sign({userId:user._id},'MY_SECRET_KEY')
        res.send({token})
    }catch(err){
        return res.status(404).send('email or password not valid')
    }
})
module.exports=router;