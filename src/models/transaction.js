import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: false },
}, {
  timestamps: true
});

export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
