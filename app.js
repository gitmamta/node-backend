
require('dotenv').config();
const express=require("express")
const app=express();
const mongoose = require("mongoose");
const port = process.env.PORT ;

const bookingRoutes=require("./routes/bookingRouter");
const staffRoutes=require("./routes/staffRouter");
const meetingRoutes=require("./routes/meetingRouter");
const menuRoutes=require("./routes/menuRouter");
const roomsRoutes=require("./routes/roomRouter");
const tableRoutes=require("./routes/tableRouter");
const cors=require("cors");

// app.use(cors());
app.use(cors({
  origin: "http://localhost:4200" // allow only Angular frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/bookings", bookingRoutes);

app.use("/api/staffs", staffRoutes);
app.use("/api/meetings",meetingRoutes);
app.use("/api/menu",menuRoutes);
app.use("/api/rooms",roomsRoutes);
app.use("/api/tableBookings",tableRoutes)


mongoose.connect("mongodb+srv://root:root@cluster0.w5afnlb.mongodb.net/bookingDB?appName=Cluster0").then(()=>console.log("Mongodb connected !")).catch((err)=>console.log("Mongo connect Error",err))







app.listen(port, () => console.log(`Server running on http://localhost:${port}`));