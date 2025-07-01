import { Schema, model } from "mongoose";

const ingredientSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
    enum: [
      "g",
      "kg",
      "ml",
      "l",
      "cup",
      "tbsp",
      "tsp",
      "piece",
      "slice",
      "other",
      "whole"
    ],
  },
});

const ingredientModel = model("ingredient", ingredientSchema);

export { ingredientModel };
