import { Prisma, PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.orderType.findMany()
    } catch(err){ return false }
}

type CreateOrderTypeData = Prisma.Args<typeof prisma.orderType, 'create'>['data']
export const create = async (data : CreateOrderTypeData) => {
    try {
        return await prisma.orderType.create({ data })
    } catch(err){ return false }
}