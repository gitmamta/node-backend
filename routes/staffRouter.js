const express = require("express");
const router = express.Router();
const Staff = require("../models/staffModel");

// GET all staff
router.get("/", async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new staff
router.post("/", async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optional: GET staff by ID
router.get("/:id", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Search by name or ID
router.get('/search', async (req, res) => {
  const keyword = req.query.keyword || '';
  const results = await Staff.find({
    $or: [
      { staffName: { $regex: keyword, $options: 'i' } },
      { _id: { $regex: keyword, $options: 'i' } }
    ]
  });
  res.json(results);
});


module.exports = router;
