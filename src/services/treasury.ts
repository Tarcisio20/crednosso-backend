import { Prisma, PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.treasury.findMany()
    } catch(err) { return false }
}

type CreateTreasuryData = Prisma.Args<typeof prisma.treasury, 'create'>['data']
export const createTreasury = async (data : CreateTreasuryData) => {
    try {
        return await prisma.treasury.create({ data })
    } catch(err){ return false }
}