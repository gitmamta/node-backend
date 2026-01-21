const express=require("express");
const router=express.Router();
const Booking=require("../models/bookingModel");
const authMiddleware=require("../middleware/authBearer");
const roleMiddleware=require("../middleware/roleCheck");



router.post("/",authMiddleware, async (req, res) => {
  try {
    console.log("Booking received:", req.body);
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/",authMiddleware,roleMiddleware('Admin'), async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});




// PATCH /api/bookings/:id/cancel  (soft delete)
router.patch('/cancel/:id',authMiddleware,roleMiddleware('Admin','User'),async (req, res) => {
   console.log("PATCH /:id/cancel called with ID:", req.params.id);
  try {
    const bookingId = req.params.id;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking: updatedBooking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// PATCH /api/bookings/:id  (update specific fields like confirmed)
router.patch('/:id',authMiddleware,roleMiddleware('Admin','User'),async (req, res) => {
  try {
    const bookingId = req.params.id;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// PUT /api/bookings/:id  (full update)
router.put('/:id', authMiddleware,roleMiddleware('Admin'),async (req, res) => {
  try {
    const bookingId = req.params.id;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/:id",authMiddleware,async (req, res) => {
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




module.exports=router;