const mongoose = require("mongoose");

const tableBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: { 
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  specialRequest: {
    type: String,
    default: ""
  }
}, { timestamps: true });


const TableBooking = mongoose.model("TableBooking", tableBookingSchema);

module.exports = TableBooking;
