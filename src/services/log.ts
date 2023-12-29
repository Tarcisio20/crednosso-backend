import { Prisma, PrismaClient } from 'prisma/prisma-client'

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.log.findMany()
    } catch (err) { return false }
}

export const getForUser = async (id : number) => {
    try {
        return await prisma.log.findMany({ where : { id_responsable_user : id } })
    } catch(err) {  return false}
}