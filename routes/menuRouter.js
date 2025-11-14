const express=require("express");
const Menu=require("../models/menuModel");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const menuItem = await Menu.findOne({ id: req.params.id });
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  const menuItem = new Menu(req.body);
  try {
    const newItem = await menuItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put("/:id", async (req, res) => {
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


router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Menu.findOneAndDelete({ id: req.params.id });
    if (!deletedItem) return res.status(404).json({ message: "Menu item not found" });
    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports=router;
