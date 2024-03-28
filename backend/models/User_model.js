import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   latitude: { type: String, required: true },
//   longitude: { type: String, required: true },
//   location_details: {
//     place_id: { type: String, required: true },
//     city: { type: String, required: true },
//   },
// });
const LocationSchema = new mongoose.Schema({
    place_id: { type: String, required: true },
    city: { type: String, required: true },
})
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    location_details: {
      type: LocationSchema,
    },
  });

export const UserModel = mongoose.model("user", UserSchema);
