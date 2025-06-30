import { Request, Response, NextFunction } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //first validation
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const [tokenType, _token] = req.headers.authorization!.split(" ");

    if (tokenType !== "Bearer") {
      res.status(401).json({
        message: "Unauthorized",
      });
    }
    
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
    console.error(error);
  }

  next();
}
