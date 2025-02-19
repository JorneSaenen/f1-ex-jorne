import mongoose from "mongoose";
const { Schema } = mongoose;

const locationSchema = new Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
});

const circuitSchema = new Schema({
  circuit_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: locationSchema, required: true },
  length_km: { type: Number, required: true },
  turns: { type: Number, required: true },
});

export const Circuit = mongoose.model("Circuit", circuitSchema);
