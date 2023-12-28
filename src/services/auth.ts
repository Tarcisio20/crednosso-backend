import { PrismaClient } from 'prisma/prisma-client'
const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS
export const hashPassword = async (password : string) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}
export const comparePassword = async (inputPassword : string, hashedPassword :string)  => {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
      } catch (error) {
        throw error;
      }
}

export const createToken = async (email : string) => {
    try {
        const hashedToken = await bcrypt.hash(email, saltRounds);
        return hashedToken;
      } catch (error) {
        throw error;
      }
}

export const validadeToken = async (token : string, hashedToken : string) => {
    try {
        const match = await bcrypt.compare(token, hashedToken);
        return match;
      } catch (error) {
        throw error;
      }
}
// FUNCTIONS
export const loginUser = async (email : string, password : string) => {
    const prisma = new PrismaClient()
     
    const user = await prisma.user.findFirst({ where : { email } })

    if(!user?.id) return false
    if(!comparePassword(password, user.password)) return false
     const token = createToken(user.email)
        
    return true;
}