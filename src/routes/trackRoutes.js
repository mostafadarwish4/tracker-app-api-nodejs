const express=require('express')
const mongoose=require('mongoose')
const requireAuth=require('../middlewares/requireAuth')


const router =express.Router()
const Track=mongoose.model('Track')
router.use(requireAuth)
router.get('/tracks',async(req,res)=>{
    const tracks=await Track.find({userId:req.user._id})
    console.log(tracks)
    res.send(tracks)
})

router.post('/tracks',async(req,res)=>{
    const {name,locations}=req.body
    if(!name|| !locations){
        return res.status(422)
                  .send({err:'you must provide a track name or locations'})
    }
    try{
        const track=new Track({name,locations,userId:req.user._id})
        await track.save()
        res.send({track})
    }catch(err){
        return res.status(422).send({err:err.message})
    }
})
module.exports=router