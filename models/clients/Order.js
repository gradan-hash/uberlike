import mongoose from "mongoose";
const { Schema } = mongoose;

const userDestinationdata = {
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
};

const userOrigindata = {
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
};

const userSchema = new Schema(
  {
    ownerId: {
      type: String,
      ref: "Providers",
      required: false,
    },
    userDestination: {
      type: userDestinationdata,
      required: false,
      unique: false,
    },
    userOrigin: {
      type: userOrigindata,
      required: false,
    },
    userid: {
      type: String,
      ref: "Users",
      required: false,
    },

    price: {
      type: String,
      required: false,
    },
    amountPaid: {
      type: String,
      required: false,
    },

    rideid: {
      type: String,
      ref: "Rides",
      required: false,
    },
    status: {
      type: String,
      required: false,
      default: "Uncornfirmed",
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Order", userSchema);
