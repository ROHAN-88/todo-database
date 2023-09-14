import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 70,
    trim: true,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
