const express = require("express");
const router = express.Router();
const Staff = require("../models/staffModel");
const authMiddleware=require("../middleware/authBearer");
const roleMiddleware=require("../middleware/roleCheck");

// GET all staff
router.get("/", authMiddleware,roleMiddleware('Admin'),async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new staff
router.post("/",authMiddleware,roleMiddleware('Admin'), async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Search by name or ID
router.get('/search',authMiddleware,roleMiddleware('Admin'),async (req, res) => {
  const keyword = req.query.keyword || '';
  const results = await Staff.find({
    $or: [
      { staffName: { $regex: keyword, $options: 'i' } },
      { staffId: { $regex: keyword, $options: 'i' } }
    ]
  });
  res.json(results);
});

// Optional: GET staff by ID
router.get("/:id",authMiddleware,roleMiddleware('Admin'),async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: "Staff not found" });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
