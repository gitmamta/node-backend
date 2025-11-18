const express=require("express");
const router=express.Router();
const Booking=require("../models/bookingModel");


router.post("/", async (req, res) => {
  try {
    console.log("Booking received:", req.body);
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking); // <-- make sure it's a single object
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/update/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body; // full edit data

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// PUT /api/bookings/:id
router.put('/:id', async (req, res) => {
  console.log('PUT body:', req.body); 
  try {
    const bookingId = req.params.id;
    const updateData = req.body; // { status: 'cancelled' }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true } // return updated document
    );

    res.status(200).json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});




module.exports=router;