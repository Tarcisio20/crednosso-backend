import { PrismaClient } from 'prisma/prisma-client'
import { RequestHandler } from "express";

const prisma = new PrismaClient()

export const setToken = async (email : string)  => {
   
}