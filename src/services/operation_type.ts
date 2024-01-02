import { PrismaClient, Prisma } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return prisma.operationType.findMany()
    } catch(err) { return false }
}

type CreateOperationTypeData = Prisma.Args<typeof prisma.operationType, 'create'>['data']
export const createOperationType = async (data : CreateOperationTypeData) => {
    try {
        return await prisma.operationType.create({ data })
    } catch(err) { return false }
}