import express from "express";
import Profiles from "../Model/Profiles.js";

const router = express.Router();

// GET professional certificates
router.get("/certificates", async(req, res) => {
    try{
        const profile = await Profiles.findOne({}, "professionalCertificates");

        if(!profile){
            return res.status(404).json({ message: "No profile found" });
        }

        res.json(profile?.professionalCertificates || []);
        } catch (error){
            console.error(error);
        res.status(500).json({message: "failed to fetch profile data"});
        }
});


export default router;