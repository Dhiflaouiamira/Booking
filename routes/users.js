
import express from "express";
import User from "../models/User.js";
import {verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


router.get("/checkauthentication", verifyToken, (req,res,next)=>{
  res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
  res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
  res.send("hello admin, you are logged in and you can delete all accounts")
})

// add user

router.post("/",verifyUser,async (req,res,next)=>{

try {
     const NewUser = new User(req.body);
     const savedUser = await NewUser.save();
     res.status(200).json(savedUser);
    
} catch (err) {
    next(err)
    
}
})


// get all users
router.get("/",verifyAdmin,async (req,res,next)=>{

    try {
        
         const users = await User.find({});
         res.status(200).json(users);
        
    } catch (err) {
        next(err)  
    }
    })

// get  user by id
router.get("/:id",verifyUser,async (req,res,next)=>{

    try {
        const id =req.params.id;
         const user = await User.findById(id);
         res.status(200).json(user);
        
    } catch (err) {
        next(err)  
    }
    })

// update user
router.put("/:id",verifyUser,async (req,res,next)=>{

    try {
        const id =req.params.id;
         const user = await User.findByIdAndUpdate(id,req.body);
         res.status(200).json(user);
        
    } catch (err) {
        next(err)  
    }
    })


// delete user
router.delete("/:id",verifyUser,async (req,res,next)=>{
    const id =req.params.id;
    
    try {
      await User.findByIdAndDelete(id);
         res.status(200).json("user deleted sucssesfuly");
        
    } catch (err) {
        next(err)  
    }
    })


export default router


