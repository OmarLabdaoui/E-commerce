const jwt=require('jsonwebtoken');

const jwtGetThoken=(user)=>{
    const secretkey=process.env.JWT_SECRET_KEY;
    const token=jwt.sign({
        _id:user._id,name:user.name,email:user.email,isAdmin: user.isAdmin,
    },secretkey)
    return token
}
module.exports =jwtGetThoken