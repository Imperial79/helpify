import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    city: { type: String, required: true }
})

export const LocationModel = mongoose.model("location", LocationSchema);
