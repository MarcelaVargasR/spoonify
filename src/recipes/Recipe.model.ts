import { Schema, model } from "mongoose";

const ingredientSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
});

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
  ingredients: [ingredientSchema],
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
  popularity: {
    type: Number,
    require: true 
  },
  author:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const RecipeModel = model("Recipe", recipeSchema);

export { RecipeModel };
