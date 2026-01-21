const express = require("express");
const router = express.Router();
const Room = require("../models/roomModel");
const authMiddleware=require("../middleware/authBearer");
const roleMiddleware=require("../middleware/roleCheck");

// @route   POST /api/rooms/insertMany
// @desc    Insert multiple rooms at once
router.post("/insertMany",authMiddleware,roleMiddleware('Admin'), async (req, res) => {
  try {
    const rooms = req.body.rooms; // Expecting { "rooms": [ ... ] } in request body
    if (!rooms || !Array.isArray(rooms)) {
      return res.status(400).json({ message: "Rooms array is required" });
    }

    const insertedRooms = await Room.insertMany(rooms);
    res.status(201).json(insertedRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/rooms
// @desc    Get all rooms
router.get("/",authMiddleware, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/rooms/:id
// @desc    Get room by ID
router.get("/:id",authMiddleware, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
