import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Profile from "./Routes/Profile.js"
import bonusRoutes from "./Routes/Bonus.js"


const web = express();
web.use(cors()); 

// web.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT"]
// }));

web.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Workexperience")
    .then(() => console.log("Mongodb connected"))
    .catch(error => console.error(error));

web.use("/api/profile", Profile);
web.use("/api/bonus", bonusRoutes);
web.get("/test", (req, res) => {
  res.json({ ok: true });
});

web.listen(5000, () => {
    console.log("server running on http://localhost:5000")
});
