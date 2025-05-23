import bcrypt from "bcryptjs";

export async function CreateHashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  return hash;
}
