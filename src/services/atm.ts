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
        console.log(data)
        return   await prisma.atm.create({ data  })
    } catch(err) { 
        
        return false
    }
}

export const getOne = async (id : number) => {
    try {
        return await prisma.atm.findUnique({ where : { id } })
    } catch(err) { return false }
}

type AtmUpdateData = Prisma.Args<typeof prisma.atm, 'update'>['data']
export const update = async (id: number, data : AtmUpdateData) => {
    try {
        return await prisma.atm.update({ where : { id }, data })
    } catch(err){ return false }
}

export const remove = async (id :number) => {
    const data = { status : false }
    try {
        return await prisma.atm.update({ where : { id }, data })
    } catch(err){ return false }
}

export const getSearch = async (partial : string) => {
    try{
        return  await prisma.user.findMany({ where : 
            { name_full :  { contains : partial } } 
        })    
    }catch(err){ return false}
}