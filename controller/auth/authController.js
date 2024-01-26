const User=require('../../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signUp=async (req,resp)=>
{
    try
    {
        const {username,password,email}=req.body;
        const data=await User.findOne({email:email}).exec();
        if (data)
        {
            return resp.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({username,password:hashedPassword,email});
        await user.save();
        const token=jwt.sign({username:username,email:email},process.env.JWT_SECRET);
        return resp.status(201).json({message:"User created",token});
    }
    catch(err)
    {
        return resp.status(500).json({message:err.message});
    }
}

const signIn=async (req,resp)=>
{
    try
    {
        const {email,password}=req.body;
        const data=await User.findOne({email:email}).exec();
        console.log(data);
        if (!data)
        {
            return resp.status(400).json({message:"Invalid credentials"});
        }
        const match=await bcrypt.compare(password,data.password);
        if (!match)
        {
            return resp.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({username:data.username,email:data.email},process.env.JWT_SECRET);
        return resp.status(200).json({message:"User logged in",token});
    }
    catch(err)
    {
        return resp.status(500).json({message:err.message});
    }

}

// const signOut=(req,resp)=>
// {

// }

module.exports={signUp,signIn};
