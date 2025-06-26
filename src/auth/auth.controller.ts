import { Request, Response } from "express";
import { UserModel } from "../users/User.model";
import {RegisterType} from "../types/register.type"


async function login(_req: Request, res: Response) {
  res.json({
    message: "Log in ",
  });
}

async function register(req: Request, res: Response) {
  const body: RegisterType = req.body;
  
    const newUser = await new UserModel({
      email: body.email,
      password: body.password,
      isAdmin: false
    }).save();
  
    res.json({
      newUser,
    });
}

async function logout(_req: Request, res: Response) {
  res.json({
    message: true,
  });
}
export { login, register, logout };
