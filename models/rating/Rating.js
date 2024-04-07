import mongoose from "mongoose";
const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    userid: {
      type: String,

      required: true,
    },
    providerid: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", RatingSchema);
