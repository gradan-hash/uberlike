import mongoose from "mongoose";
const { Schema } = mongoose;

//email, complaint, userid

const ComplainsSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    complaint: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complains", ComplainsSchema);
