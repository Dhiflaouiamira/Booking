import express from "express";

import Hotel  from "../models/Hotel.js";
const router = express.Router();

// add hotel
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get all hotels
router.get("/", async (req, res) => {
   
    try {
      const Hotels = await Hotel.find({});
    res.status(200).json(Hotels) 
    } catch (error) {
      res.status(500).json(error);
    }
  });

  // get hotel by id
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id; 
      const hotel = await Hotel.findById(id);
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // update hotel
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id; 
      const hotel = await Hotel.findByIdAndUpdate(id,req.body);
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
    // delete hotel
    router.delete("/:id", async (req, res) => {
        const id = req.params.id; 
          const hotel = await Hotel.findByIdAndDelete(id);
       
        try {
         
          res.status(200).json("hotel deleted succefly");
        } catch (error) {
          res.status(500).json(error);
        }
      });



export default router
