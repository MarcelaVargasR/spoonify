import { hash, genSalt } from "bcryptjs";

export async function hashPassword(plainPassword: string): Promise<string> {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(plainPassword, salt);

    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
