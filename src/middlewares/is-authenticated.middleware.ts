import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { TokenPayload } from "../types/token-payload.type";
import { UserModel } from "../users/User.model";
import { Request } from "../types/platform-request.type";

export async function isAuthenticated(
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
    const [tokenType, token] = req.headers.authorization!.split(" ");

    if (tokenType !== "Bearer") {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    // decode the payload
    const payload: TokenPayload = verify(token, "secure") as TokenPayload;
    //get user ID for payload
    const userId = payload.id;
    //verify the ID exist
    const user = await UserModel.findById(userId);
    //todo: add validation if user dosn't exist
    //@ts-ignore
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    if (error.message === "jwt expired") {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
