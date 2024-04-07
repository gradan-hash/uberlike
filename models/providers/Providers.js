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

const ProviderSchema = new Schema(
  {
    name: {
      // Updated from username to name
      type: String,
      required: true,
      // unique: true,
      trim: true, // Added trim to remove whitespace
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
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
    location: {
      type: LocationSchema, // Use the defined LocationSchema for nested structure
      required: true,
    },
    img: {
      type: String,
      required: false, // You could also set a default value if there's a default image
    },
    rating: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Provider", ProviderSchema);
