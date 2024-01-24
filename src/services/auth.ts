import { PrismaClient } from "prisma/prisma-client";
const bcrypt = require("bcrypt");

const saltRounds = 10; //process.env.SALT_ROUNDS
const prisma = new PrismaClient();

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    return false;
  }
};

export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
) => {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    return false;
  }
};

export const createToken = async (email: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedToken = await bcrypt.hash(email, salt);
    return hashedToken;
  } catch (error) {
    return false;
  }
};

export const validadeToken = async (idUser: string, tokenUser: string) => {
  try {
    const iUser = parseInt(idUser);
    const user = await prisma.user.findFirst({ where: { id: iUser } });
    if (user == null) return false;
    const match = await bcrypt.compare(tokenUser, user?.token);
    return true;
  } catch (error) {
    return false;
  }
};

export const setToken = async (idUser: number, tokenUser: string) => {
  try {
    const registerAlter = await prisma.user.update({
      where: { id: idUser },
      data: { token: tokenUser },
    });
    return true;
  } catch (error) {
    return false;
  }
};
// FUNCTIONS
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    console.log(user)
    if (!user?.id) return false;
    if (!(await comparePassword(password, user.password))) return false;

    const token = await createToken(user.email);
    await setToken(user.id, token);
    const item = {
      idUser: user.id,
      name: user.name_full,
      last_login: user.last_access_date,
      token: token,
      nivel: user.user_type,
    };
    return item;
  } catch (error) {
    return false;
  }
};
