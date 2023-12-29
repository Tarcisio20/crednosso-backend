import { PrismaClient, Prisma } from "prisma/prisma-client"

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.atm.findMany()
    } catch(err) { return false }
}
type AtmCreateData = Prisma.Args<typeof prisma.atm, 'create'>['data']
export const createAtm = async ( data : AtmCreateData ) => {
    try {
        return   await prisma.atm.create({ data  })
    } catch(err) { 
        
        return false
    }
}

export const getOne = async (id : number) => {
    try {
        return await prisma.atm.findUnique({ where : {  id } })
    } catch(err) { return false }
}