import { PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.order.findMany()
    } catch(err) { return false }
}