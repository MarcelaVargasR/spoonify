import { Response } from "express";
import { IngredientModel } from "./ingredient.model";
import { Request } from "../types/platform-request.type";
import { IngredientType } from "../types/ingredient.type";

async function createIngredient(req: Request, res: Response) {
  const body: IngredientType = req.body;

  const newIngredient = await new IngredientModel({
    title: body.title,
    unit: body.unit,
  }).save();

  res.json({
    newIngredient
  });
}





export { createIngredient };
