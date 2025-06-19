import { Request, Response } from "express";

async function getrecipes(req: Request, res: Response) {
  console.log("🚀 ~ getrecipes ~ req:", req.body.title);
  res.json({
    message: "Get All Recipes",
  });
}

export { getrecipes };
