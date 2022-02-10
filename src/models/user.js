const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const { urlencoded } = require('body-parser')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

///hashing the password before savig it to database
/// this for listening or follwing the save operation if it will happen it excuted before it 
userSchema.pre('save',function(next){
    const user=this
    //check if password entered or not
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err)
            }
            user.password=hash
            next()
        })
    })
})

userSchema.methods.comparePassword=function(candidatePassword){
    const user=this
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatched)=>{
            if(err){
                return reject(err)
            }
            if(!isMatched){
                reject(false)
            }
            resolve(true)
        })
    })
}
mongoose.model('User',userSchema)