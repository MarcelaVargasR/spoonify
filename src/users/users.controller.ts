import { Request, Response } from "express";
import { UserModel } from "./User.model";
import { UserType } from "../types/user.type";
import { hashPassword } from "../utils/hash-password.util";
import {getPagination, getPaginationInfo} from "../utils/pagination.util"

async function createUser(req: Request, res: Response) {
  const body: UserType = req.body;
  const hashedPassword = await hashPassword(body.password);

  const newUser = await new UserModel({
    email: body.email,
    password: hashedPassword,
    isAdmin: body.isAdmin,
  }).save();

  res.json({
    newUser,
  });
}

async function getAllUser(req: Request, res: Response) {
  const { page, limit, skip } = getPagination(req.query);

  const filters = req.query.search
    ? { email: { $regex: req.query.search, $options: "i" } }
    : {};

  const user = await UserModel.find(filters)
    .skip(skip)
    .limit(limit)
    .sort({ email: "ascending" });

  const totalCount = await UserModel.countDocuments(filters);
  const pagination = getPaginationInfo(totalCount, page, limit);
  

  res.json({
    pagination,
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
  const body: UserType = req.body;
  const userId = req.params.id;
  const updateUser = await UserModel.findByIdAndUpdate(userId, body, {
    new: true,
  });

  res.json(updateUser);
}

async function deleteUserById(req: Request, res: Response) {
  const userId = req.params.id;
  const deleteUser = await UserModel.findByIdAndDelete(userId);

  res.json(deleteUser);
}

export { createUser, getAllUser, getUserById, updateUserById, deleteUserById };
