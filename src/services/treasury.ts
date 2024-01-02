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

export const getOne = async (id : number) => {
    try {
        return await prisma.treasury.findMany({ where : { id } })
    } catch(err) { return false }
}

type UpdateTreasuryData = Prisma.Args<typeof prisma.treasury, 'update'>['data']
export const update = async (id : number, data : UpdateTreasuryData) => {
    try{
        return await prisma.treasury.update({ where : { id }, data })
    } catch(err){ return false }
} 