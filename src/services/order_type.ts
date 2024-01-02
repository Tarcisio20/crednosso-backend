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

export const getOne = async (id : number) => {
    try {
        return await prisma.orderType.findUnique({ where : { id } })
    } catch(err){ return false }
}

type UpdateOrderTypeData = Prisma.Args<typeof prisma.orderType, 'update'>['data']
export const update  = async (id : number, data : UpdateOrderTypeData) => {
    try {
        return await prisma.orderType.update({ where : { id }, data })
    } catch(err){ return false }
}