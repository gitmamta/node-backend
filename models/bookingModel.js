const mongoose=require("mongoose");
const bookingSchema = new mongoose.Schema({
 
  userId: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  phoneNo: {
    type: String,
    required: true
  },
  checkInDate: {
    type: String,
    required: true
  },
  checkOutDate: {
    type: String,
    required: true
  },
  guest: {
    type: Number,
    required: true
  },
  bookingType: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: { type: String, default: null },
});

const Booking = mongoose.model("Bookings", bookingSchema);

module.exports=Booking;