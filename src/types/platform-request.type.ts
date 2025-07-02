import { Request as ExpressRequest } from "express";
import { UserType } from "./user.type";

type UserTypeWithoutPassword = Omit<UserType, "password">;
type PlatformRequestQuery = {
  title?: string
};

export type Request = ExpressRequest & {
  user?: UserTypeWithoutPassword;
  query?: PlatformRequestQuery;
};
