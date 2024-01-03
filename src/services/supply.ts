import { PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try{
        return await prisma.supply.findMany()
    }catch(err){ return false }
}