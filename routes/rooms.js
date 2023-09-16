import express from "express";
const router = express.Router();
import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js";
import {verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

//add room
router.post("/",verifyAdmin, async (req,res)=>{
    const Hotelid = req.params.Hotelid
    const newRoom =  new Room(req.body);
    try {  
     
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(Hotelid,{$push:{rooms:savedRoom._id}})
        } catch (err) {
            next (err)
        }
        res.status(200).json(savedRoom);
        
    } catch (err) {
          next(err)    
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

//update room availability
router.put("/availability/:id",verifyAdmin,async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  });

//update room 
router.put("/:id",verifyAdmin, async (req,res)=>{
    
    try {  
        const id = req.params.id;
        const room = await Room.findByIdAndUpdate(id,req.body);

        res.status(200).json(room);
        
    } catch (error) {
        res.status(500).json(err);
    }
})


//delete room 
router.delete("/:id/:hotelId",verifyAdmin, async (req,res)=>{
     const hotelId = req.params.hotelId;
    try {  
        const id = req.params.id;
   await Room.findByIdAndDelete(id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
              $pull: { rooms: req.params.id },
            });
          } catch (err) {
            next(err);
          }
        res.status(200).json("room deleted succesfuly");
        
    } catch (error) {
        res.status(500).json(err);
    }
})



export default router