import { expect, test, beforeEach, describe } from "vitest";
import { IUser, UserMemory } from "../in-memory/user-memory";

describe("Create User", () => {
  let userMemory: UserMemory;

  beforeEach(() => {
    userMemory = new UserMemory();
  });

  test("should create a new user", async () => {
    const user: Omit<IUser, "id"> = {
      nome: "John Doe",
      email: "Johndoe@gmail.com",
      senha: "123456",
      tipo: "Aluno",
    };

    const createdUser = await userMemory.create(user);

    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBeDefined();
    expect(createdUser.nome).toBe(user.nome);
    expect(createdUser.email).toBe(user.email);
    expect(createdUser.senha).toBe(user.senha);
    expect(createdUser.tipo).toBe(user.tipo);
  });
});
