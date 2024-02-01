import { Prisma, PrismaClient } from "@prisma/client"

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

type UpdateOrderData = Prisma.Args<typeof prisma.order, 'update'>['data']
export const update = async (id : number, data : UpdateOrderData) => {
    try{

        return await prisma.order.update({ where : { id }, data })
    }catch(err){ return false }
}

export const remove = async (id : number) => {
    const data ={ status : false }
    try{
        return await prisma.order.update({ where : { id }, data })
    }catch(err) { return false }
}

export const search = async (batch : number) => {
    try {
        return await prisma.order.findMany({ where : {  batch } })
    }catch(err) { return false }
}