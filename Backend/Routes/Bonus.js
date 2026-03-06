import express from "express";
import Bonus from "../Model/Bonus.js";

const router = express.Router();

// GET all bonuses
router.get("/", async (req, res) => {
  try {
    const bonuses = await Bonus.find().sort({ dueDate: 1 });
    res.json(bonuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bonuses for a specific employee
router.get("/:employeeId", async (req, res) => {
  try {
    const bonuses = await Bonus.find({ employeeId: req.params.employeeId }).sort({ dueDate: 1 });
    res.json(bonuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;