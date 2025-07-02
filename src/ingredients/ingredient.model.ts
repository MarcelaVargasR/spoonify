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
      "whole",
    ],
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const IngredientModel = model("Ingredient", ingredientSchema);

export { IngredientModel };
