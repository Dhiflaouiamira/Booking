
import express from "express";
import User from "../models/User.js";
const router = express.Router();



// add user

router.post("/",async (req,res,next)=>{

try {
     const NewUser = new User(req.body);
     const savedUser = await NewUser.save();
     res.status(200).json(savedUser);
    
} catch (err) {
    next(err)
    
}
})


// get all users
router.get("/",async (req,res,next)=>{

    try {
        
         const users = await User.find({});
         res.status(200).json(users);
        
    } catch (err) {
        next(err)  
    }
    })

// get  user by id
router.get("/:id",async (req,res,next)=>{

    try {
        const id =req.params.id;
         const user = await User.findById(id);
         res.status(200).json(user);
        
    } catch (err) {
        next(err)  
    }
    })

// update user
router.put("/:id",async (req,res,next)=>{

    try {
        const id =req.params.id;
         const user = await User.findByIdAndUpdate(id,req.body);
         res.status(200).json(user);
        
    } catch (err) {
        next(err)  
    }
    })


// delete user
router.delete("/:id",async (req,res,next)=>{
    const id =req.params.id;
    
    try {
        const user = await User.findByIdAndDelete(id);
         res.status(200).json("user deleted sucssesfuly");
        
    } catch (err) {
        next(err)  
    }
    })


export default router


