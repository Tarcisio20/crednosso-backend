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

export const getOne = async (id : number) => {
    try {
        return await prisma.operationType.findMany({ where : { id } })
    } catch(err) { return false }
}

type UpdateOperationTypeData = Prisma.Args<typeof prisma.operationType, 'update'>['data']
export const update = async (id : number , data : UpdateOperationTypeData) => {
    try {
        return await prisma.operationType.update({ where : { id }, data })
    } catch(err){ return false }
}

export const remove = async (id : number) => {
    const data = {status : false}
    try {
        return await prisma.operationType.update({ where : { id }, data })
    } catch(err){ return false }
}

export const search = async (partial : string) => {
    try {
        return await prisma.operationType.findMany({ where : { name_full : { contains : partial } } })
    } catch (err){ return false }
}