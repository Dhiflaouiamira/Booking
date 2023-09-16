import express from "express";

import Hotel  from "../models/Hotel.js";
import {verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import Room from "../models/Room.js";
const router = express.Router();

// add hotel
router.post("/", verifyAdmin,async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get all hotels
router.get("/", async (req, res,next) => {
   

    try {
      const Hotels = await Hotel.find({});
    res.status(200).json(Hotels) 
    } catch (err) {
     next(err);
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
  router.put("/:id",verifyAdmin, async (req, res) => {
    try {
      const id = req.params.id; 
      const hotel = await Hotel.findByIdAndUpdate(id,req.body);
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
    // delete hotel
    router.delete("/:id",verifyAdmin, async (req, res) => {
        const id = req.params.id; 
          await Hotel.findByIdAndDelete(id);
       
        try {
         
          res.status(200).json("hotel deleted succefly");
        } catch (error) {
          res.status(500).json(error);
        }
      });


      router.get("/countByCity", async (req, res, next) => {
        const cities = req.query.cities.split(",");
        try {
          const list = await Promise.all(
            cities.map((city) => {
              return Hotel.countDocuments({ city: city });
            })
          );
          res.status(200).json(list);
        } catch (err) {
          next(err);
        }
      });

      router.get("/countByType", async (req, res, next) => {
        try {
          const hotelCount = await Hotel.countDocuments({ type: "hotel" });
          const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
          const resortCount = await Hotel.countDocuments({ type: "resort" });
          const villaCount = await Hotel.countDocuments({ type: "villa" });
          const cabinCount = await Hotel.countDocuments({ type: "cabin" });
      
          res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
          ]);
        } catch (err) {
          next(err);
        }
      }
      );

      router.get("/room/:id",async (req, res, next) => {
        try {
          const hotel = await Hotel.findById(req.params.id);
          const list = await Promise.all(
            hotel.rooms.map((room) => {
              return Room.findById(room);
            })
          );
          res.status(200).json(list)
        } catch (err) {
          next(err);
        }
      });



export default router
