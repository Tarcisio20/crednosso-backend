import { Prisma, PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.order.findMany()
    } catch(err) { return false }
}

type CreateOrderData = Prisma.Args<typeof prisma.order, 'create'>['data']
export const create = async ( data : CreateOrderData ) => {
    try {
        return await prisma.order.create({ data })
    } catch(err) { console.log(err) }
}

export const getOne = async (id : number) => {
    try{
        return await prisma.order.findMany({ where : { id } })
    }catch(err){ return false }
}