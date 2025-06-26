import { Request, Response } from "express";
import { UserModel } from "../users/User.model";
import { RegisterType } from "../types/register.type";
import { hashPassword } from "../utils/hash-password.util";

async function login(req: Request, res: Response) {
  const body: RegisterType = req.body;

  const foundUser = await UserModel.findOne({
    email: body.email,
  });

  if (!foundUser) {
    res.status(404).json({
      message: "User not found",
    });
  }

  if (foundUser!.password !== req.body.password) {
    res.status(404).json({
      message: "password incorrect",
    });
  }

  res.json({
    message: "Log in ",
  });
}

async function register(req: Request, res: Response) {
  const body: RegisterType = req.body;
  const hashedPassword = await hashPassword(body.password);

  const newUser = await new UserModel({
    email: body.email,
    password: hashedPassword,
    isAdmin: false,
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
