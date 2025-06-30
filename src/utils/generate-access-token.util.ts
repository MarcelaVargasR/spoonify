import { sign } from "jsonwebtoken";

export function generateAccessToken(arg: any) {
  return sign(
    {
      id: arg._id,
    },
    "secure",
    {
      expiresIn: "1d",
    }
  );
}
