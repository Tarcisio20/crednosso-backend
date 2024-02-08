import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getAll = async ()=>{
    try {
        return await prisma.statusConfirmationOrder.findMany()
    } catch(err) { return false }
}

type ConfirmationTypeCreateData = Prisma.Args<typeof prisma.statusConfirmationOrder, 'create'>['data']
export const create = async (data : ConfirmationTypeCreateData) => {
    try {
        return await prisma.statusConfirmationOrder.create({ data })
    } catch(err) { return false }
}

export const getOne = async (id : number) => {
    try {
        return await prisma.statusConfirmationOrder.findUnique({ where : { id } })
    } catch(err) { return false }
}

type ConfirmationUpdateTypeData = Prisma.Args<typeof prisma.statusConfirmationOrder, 'update'>['data']
export const update = async (id: number, data : ConfirmationUpdateTypeData) => {
    try {
        return await prisma.statusConfirmationOrder.update({ where : { id }, data })
    } catch(err){ return false }
}

type ConfirmationRmoveTypeData = Prisma.Args<typeof prisma.statusConfirmationOrder, 'update'>['data']
export const remove = async (id : number, data : ConfirmationRmoveTypeData) => {
    try {
        return await prisma.statusConfirmationOrder.update({ where : { id }, data })
    } catch(err){ return false }
}