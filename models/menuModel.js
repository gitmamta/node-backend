const mongoose=require("mongoose");

const menuSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  image: { type: String }
});

// Model: Mongoose will pluralize 'Menu' to 'menus' by default
const Menu = mongoose.model("Menu", menuSchema);

module.exports=Menu;
