
require('dotenv').config();
const express=require("express")
const app=express();
// const cookieParser=require("cookie-parser")
const mongoose = require("mongoose");
const connectDB = require("./config/mongo");
const path = require("path");
const dotenv=require("dotenv")
const port = process.env.PORT ;
// const protectedRoutes = require("./routes/protectedRoutes");




dotenv.config();
connectDB();


const bookingRoutes=require("./routes/bookingRouter");
const staffRoutes=require("./routes/staffRouter");
const meetingRoutes=require("./routes/meetingRouter");
const menuRoutes=require("./routes/menuRouter");
const roomsRoutes=require("./routes/roomRouter");
const tableRoutes=require("./routes/tableRouter");
const authRoutes=require("./routes/authRouter");
const cors=require("cors");

// app.use(cors());
app.use(cors({
  origin:  ["https://mamtapalace.netlify.app","http://localhost:4200","https://node-backend-uhgx.onrender.com"],
  methods: "GET,POST,PUT,PATCH,DELETE",
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));






app.use("/api/bookings", bookingRoutes);


app.use("/api/staffs", staffRoutes);
app.use("/api/meetings",meetingRoutes);
app.use("/api/menu",menuRoutes);
app.use("/api/rooms",roomsRoutes);
app.use("/api/tableBookings",tableRoutes);
app.use("/api/auth",authRoutes);






app.get("/api/test", (req, res) => {
  res.json({ msg: "API OK" });
});





// app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
// app.listen(process.env.PORT, () =>
//   console.log(`Server running http://localhost:${process.env.PORT}`)
// );

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => {
  console.error("Failed to start server due to DB error:", err);
  process.exit(1);
});