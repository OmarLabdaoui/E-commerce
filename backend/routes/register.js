const decrypt=require("bcrypt")
const joi=require("joi")
const express=require("express")
const { User } = require("../models/user")
const jwtGetThoken = require("../utils/jwtGetThoken")
const router=express.Router()

router.post('/',async(req,res)=>{
    const schema=joi.object({
        name:joi.string().min(3).required().max(30),
        email:joi.string().min(3).required().max(200).email(),
        password:joi.string().min(6).required().max(200),
    })
   const {error}= schema.validate(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
  let user= await User.findOne({email:req.body.email})
  if(user){
    res.status(400).send("User Already Exist...")
  }
  user=new User({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
  })
  const salt=await decrypt.genSalt(10)
   user.password=await decrypt.hash(user.password,salt)
  await user.save()

  const token = jwtGetThoken(user)
  res.send(token)
})
module.exports=router