const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true }
});

const Staff = mongoose.model("Staffs", staffSchema);

module.exports = Staff;
