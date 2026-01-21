const express=require("express");
const Menu=require("../models/menuModel");
const router = express.Router();
const authMiddleware=require("../middleware/authBearer");
const roleMiddleware=require("../middleware/roleCheck");


router.get("/",authMiddleware, async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id",authMiddleware, async (req, res) => {
  try {
    const menuItem = await Menu.findOne({ id: req.params.id });
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/",authMiddleware,roleMiddleware('Admin'),async (req, res) => {
  const menuItem = new Menu(req.body);
  try {
    const newItem = await menuItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/:id", authMiddleware,roleMiddleware('Admin'),async (req, res) => {
  try {
    const updatedItem = await Menu.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Menu item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete("/:id",authMiddleware,roleMiddleware('Admin'), async (req, res) => {
  try {
    const deletedItem = await Menu.findOneAndDelete({ id: req.params.id });
    if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports=router;
