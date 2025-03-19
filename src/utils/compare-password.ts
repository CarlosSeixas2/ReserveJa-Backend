import bcrypt from "bcryptjs";

export async function ComparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  const compare = await bcrypt.compare(password, hash);

  return compare;
}
