import { Response } from "express";
import { ingredientModel } from "./ingredient.model";
import { Request } from "../types/platform-request.type";
import { IngredientType } from "../types/ingredient.type";

async function createIngredient(req: Request, res: Response) {
  const body: IngredientType = req.body;

  const newIngredient = await new ingredientModel({
    title: body.title,
    unit: body.unit,
  }).save();

  res.json({
    newIngredient
  });
}





export { createIngredient };
