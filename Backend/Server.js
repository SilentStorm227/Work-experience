import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Profile from "./Routes/Profile.js"

const web = express();

web.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"]
}));

web.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Workexperience")
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.err(err));

web.use("/api/profile", Profile);

web.listen(5000, () => {
    console.log("server running on http://localhost:5000")
});
