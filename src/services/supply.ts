import { Prisma, PrismaClient } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try{
        return await prisma.supply.findMany()
    }catch(err){ return false }
}

type CreateSuppyData = Prisma.Args<typeof prisma.supply, 'create'>['data']
export const create = async (data : CreateSuppyData)=>  {
    try{
        return await prisma.supply.create({ data })
    }catch(err){ return false }
}

export const getOne = async (id : number) => {
    try{
        return await prisma.supply.findUnique({ where : { id } })
    }catch(err) { return false }
}

type UpdateSupplyData = Prisma.Args<typeof prisma.supply, 'update'>['data']
export const update = async (id : number, data : UpdateSupplyData) => {
    try{
        return await prisma.supply.update({ where : { id }, data })
    } catch(err){ return false }
}  

export const remove = async (id : number) => {
    const data = { status : false }
    try{
        return await prisma.supply.update({ where : { id }, data })
    }catch(err){ return false }
}