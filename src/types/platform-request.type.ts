import { Request as ExpressRequest } from "express";
import { UserType } from "./user.type";

type UserTypeWithoutPassword = Omit<UserType, "password">;

export type Request = ExpressRequest & {
  user?: UserTypeWithoutPassword;
};
