import mongoose from "mongoose";
const { Schema } = mongoose;

const TeamSchema = new Schema({
  team_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  principal: { type: String, required: true },
  base: { type: String, required: true },
  founded_year: { type: Number, required: true },
  engine: { type: String, required: true },
  drivers: [
    {
      driver_id: { type: String, required: true },
      position: { type: Number, required: true },
    },
  ],
  image: { type: String, required: true },
});

export const Team = mongoose.model("Team", TeamSchema);
