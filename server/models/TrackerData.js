import mongoose from "mongoose";

const trackerDataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    bmi: {
      type: Object,
      default: null
    },
    logs: {
      type: Map,
      of: Object,
      default: {}
    }
  },
  { timestamps: true }
);

const TrackerData = mongoose.model("TrackerData", trackerDataSchema);

export default TrackerData;