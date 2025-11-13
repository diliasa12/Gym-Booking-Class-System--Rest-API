import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter title class"],
  },
  description: {
    type: String,
  },
  date: Date,
  capacity: Number,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
export default Class;
