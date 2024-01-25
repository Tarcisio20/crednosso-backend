import { Prisma, PrismaClient } from 'prisma/prisma-client'
import { createToken, hashPassword } from './auth'

const prisma = new PrismaClient()

export const getAll = async () => {
    try {
        return await prisma.user.findMany()
    }catch(err){ return false }
}

export const createUser = async (name : string, email : string, type : string) => {
    try{
        // CRIAR SENHA PADRAO
        const password = await hashPassword(process.env.PASSWORD_DEFAULT as string)
        const createTokenUser = await createToken(email)
        const items = {
            name_full : name,
            email : email,
            user_type : type,
            password : password,
            last_access_date : new Date(),
            token : createTokenUser
        }
        const userRegister = await prisma.user.create({
            data : items
        })
        return true
    }catch(err){ return false }
}

export const getOne = async (id : number) => {
    try {
        return await prisma.user.findFirst({ where : { id } })
    }catch(err){ return false }
}

type UserUpdateData = Prisma.Args<typeof prisma.user, 'update'>['data']
export const update = async (id : number, data : UserUpdateData) => {
    try {
        return await prisma.user.update({ where : { id }, data })
    }catch(err){ return false }
}

export const remove =  async (id : number) => {
    const data = { status : false }
    try{
        return await prisma.user.update({ where : { id }, data })
    }catch(err) { return false }
}

export const getSearch = async (partial : string) => {
    try{
        return  await prisma.user.findMany({ where : 
            { name_full :  { contains : partial } } 
        })    
    }catch(err){ return false}
}