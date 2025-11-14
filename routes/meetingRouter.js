const  express=require("express");
const router = express.Router();
const Meeting=require("../models/meetingModel");

// ✅ Get all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get a single meeting by id
router.get("/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ id: req.params.id });
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Create a new meeting
router.post("/", async (req, res) => {
  try {
    const newMeeting = new Meeting(req.body);
    const savedMeeting = await newMeeting.save();
    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Update an existing meeting
router.put("/:id", async (req, res) => {
  try {
    const updatedMeeting = await Meeting.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMeeting) return res.status(404).json({ message: "Meeting not found" });
    res.status(200).json(updatedMeeting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete a meeting
router.delete("/:id", async (req, res) => {
  try {
    const deletedMeeting = await Meeting.findOneAndDelete({ id: req.params.id });
    if (!deletedMeeting) return res.status(404).json({ message: "Meeting not found" });
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports=router;