import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: {
        type: String,
        required: true,
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
        ],
      },
    },
  ],
  preparationSteps: [
    {
      type: String,
      required: true,
    },
  ],
  preparationTime: {
    type: Number,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
  },
  priceEstimate: {
    type: Number,
  },
  isPrivate: {
    type: Boolean,
    require: true,
  },
});

const RecipeModel = model("Recipe", recipeSchema);

export { RecipeModel };
