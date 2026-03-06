import mongoose from "mongoose";

const bonusSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
  employeeName: { type: String, required: true }, // denormalized for display
  reason: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: "Pending" } // "Due this week", "Approved", etc
}, { timestamps: true });

export default mongoose.model("Bonus", bonusSchema);