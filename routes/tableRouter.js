const express = require("express");
const router = express.Router();
const TableBooking = require("../models/tableModel"); 

router.get("/", async (req, res) => {
  try {
    const bookings = await TableBooking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const booking = await TableBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  const booking = new TableBooking({
    name: req.body.name,
    phoneNo: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    guest: req.body.guests,
    specialRequest: req.body.specialRequest
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST multiple bookings at once
router.post("/bulk", async (req, res) => {
  try {
    const bookings = await TableBooking.insertMany(req.body);
    res.status(201).json(bookings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// PUT / PATCH to update booking (confirm or edit)
router.patch("/:id", async (req, res) => {
  try {
    
    const updatedBooking = await TableBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });

    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a booking by ID

router.delete("/:id", async (req, res) => {
  try {
    const booking = await TableBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports=router;