import express from "express";
import Profiles from "../Model/Profiles.js";

const router = express.Router();

router.get("/", async(req,res) => {
    try{
        const profiles = await Profiles.find();

        if(!profiles || profiles.length === 0){
            return res.status(404).json({ message: "No profile found" });
        }

        res.json(profiles);
        } catch (error){
            console.error(error);
        res.status(500).json({message: "failed to fetch profile data"});
        
    }
});

// GET professional certificates
router.get("/:userId", async(req, res) => {

    try{
        const profile = await Profiles.findOne({ userId: req.params.userId });

        if(!profile){
            return res.status(404).json({ message: "No profile found" });
        }

        res.json(profile);
        } catch (error){
            console.error(error);
        res.status(500).json({message: "failed to fetch profile data"});
        }
});

export default router;