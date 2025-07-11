import { Request as ExpressRequest } from "express";
import { UserType } from "./user.type";

type UserTypeWithoutPassword = Omit<UserType, "password">;
type PlatformRequestQuery = {
  title?: string;
  page?: string;
  limit?: string;
};

export type Request = ExpressRequest & {
  user?: UserTypeWithoutPassword;
  query?: PlatformRequestQuery;
};
