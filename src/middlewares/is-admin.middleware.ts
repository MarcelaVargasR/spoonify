import { Response, NextFunction } from "express";
import { Request } from "../types/platform-request.type";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user?.isAdmin) {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
