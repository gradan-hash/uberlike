import mongoose from "mongoose";
const { Schema } = mongoose;

const RidesSchema = new Schema(
  {
    OwnerId: {
      type: String,
      required: true,
    },
    carName: {
      
      type: String,
      required: true,
      
      trim: true,
    },
    groupSize: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    carImageUrl: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rides", RidesSchema);
