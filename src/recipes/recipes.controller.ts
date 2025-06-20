import { Request, Response } from "express";

async function getrecipes(_req: Request, res: Response) {
  res.json({
    message: "Get All Recipes",
  });
}

export { getrecipes };
