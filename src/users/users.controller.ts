import { Request, Response } from "express";
import { UserModel } from "./User.model";
import { UserType } from "../types/user.type";

async function createUser(req: Request, res: Response) {
  const body: UserType = req.body;

  const newUser = await new UserModel({
    email: body.email,
    password: body.password,
  }).save();

  res.json({
    newUser,
  });
}

async function getAllUser(_req: Request, res: Response) {
  const user = await UserModel.find();

  res.json({
    user,
  });
}

async function getUserById(req: Request, res: Response) {
  const user = await UserModel.findById(req.params.id);

  res.json({
    success: true,
    data: user,
  });
}

async function updateUserById(req: Request, res: Response) {
  console.log("🚀 ~ updateUserById ~ req:", req)
  const body: UserType = req.body;
  const userId = req.params.id;
  const updateUser = await UserModel.findByIdAndUpdate(userId, body, {
    new: true,
  });

  res.json(updateUser);
}

async function deleteUserById(req:Request, res:Response) {
  const userId = req.params.id;
  const deleteUser = await UserModel.findByIdAndDelete(userId)

  res.json(deleteUser)
}

export { createUser, getAllUser, getUserById, updateUserById, deleteUserById };
