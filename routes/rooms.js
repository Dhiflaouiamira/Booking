import express from "express";
const router = express.Router();
import Room from "../models/Room.js"

//add room
router.post("/", async (req,res)=>{
    const newRoom =  new Room(req.body);
    try {  
     
        const savedRoom = await newRoom.save();

        res.status(200).json(savedRoom);
        
    } catch (error) {
        res.status(500).json(err);
    }
})


//get all rooms
router.get("/", async (req,res)=>{
    
    try {  
     
        const rooms = await Room.find({});

        res.status(200).json(rooms);
        
    } catch (error) {
        res.status(500).json(err);
    }
})


//get room by id
router.get("/:id", async (req,res)=>{
    
    try {  
        const id = req.params.id;
        const room = await Room.findById(id);

        res.status(200).json(room);
        
    } catch (error) {
        res.status(500).json(err);
    }
})



//update room 
router.put("/:id", async (req,res)=>{
    
    try {  
        const id = req.params.id;
        const room = await Room.findByIdAndUpdate(id,req.body);

        res.status(200).json(room);
        
    } catch (error) {
        res.status(500).json(err);
    }
})


//delete room 
router.delete("/:id", async (req,res)=>{
    
    try {  
        const id = req.params.id;
        const room = await Room.findByIdAndDelete(id);

        res.status(200).json("room deleted succesfuly");
        
    } catch (error) {
        res.status(500).json(err);
    }
})



export default router