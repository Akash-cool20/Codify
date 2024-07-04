import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema(
  {
    fullCode: {
      html: String,
      css: String,
      javascript: String,
    },
    title: { 
      type: String, 
      required: true 
    },
    ownerInfo: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: "User" 
    },
    ownerName: {
      type :String,
    }
  },
  { timestamps: true }
);

export const Code = mongoose.model("Code", CodeSchema);
