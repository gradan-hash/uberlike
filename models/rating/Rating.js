import mongoose from "mongoose";
const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", RatingSchema);
