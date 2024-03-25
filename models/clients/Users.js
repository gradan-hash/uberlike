import mongoose from "mongoose";
const { Schema } = mongoose;

const LocationSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },

    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: LocationSchema, 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
