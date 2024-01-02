import { RequestHandler } from "express";
import { PrismaClient } from '@prisma/client'
import * as user from '../services/user'
import { z } from "zod";

const prisma = new PrismaClient()

export const getAll : RequestHandler = async (req, res) => {
    const items = await user.getAll()
    if(items) return res.json({ users : items })

    res.json({ error : 'Ocorreu um erro' })
}

export const create : RequestHandler = async (req, res) => {
    const userSchema = z.object({
        name : z.string(),
        email : z.string(),
        type : z.string()
    })
    const body = userSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados invãlidos!' })
    if(!await user.createUser(body.data.name, body.data.email, body.data.type)) return res.json({ error : 'Erro ao cadastrar!' })

    res.json({ success : 'Usuario cadastrado' })
}

export const getUser : RequestHandler = async (req, res) => {
    const { id } = req.params

    const userRequered = await user.getOne(parseInt(id))
    if(userRequered) return res.json({ user : userRequered })
    
    res.json({ error : 'Usuario não encontrado' })
} 

export const updateUser : RequestHandler = async (req, res) => {
    const { id } = req.params
    const updateSchema = z.object({
        name_full : z.string().optional(),
        email : z.string().optional(),
        last_access_date : z.date().optional(),
        status : z.boolean().optional(),
        user_type : z.string().optional(),
        token : z.string().optional(),
        password : z.string().optional()
    })

    const body = updateSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inálidos' })

    const updatedData = await user.update(parseInt(id), body.data)
    if(updatedData) return res.json({ user : updatedData })

    res.json({ error : 'Erro ao atualizar usuario' })
}

export const deleteUser : RequestHandler = async (req, res) => {
    const { id } = req.params

    const deletedUser = await user.remove(parseInt(id))
    if(deletedUser) return res.json({ success : 'Usuario deletado'  })

    res.json({ error  : 'Erro ao deletar usuario tente mais tarde.' })
}

export const searchUser : RequestHandler = async (req, res) => {

    const SearchSchema = z.object({
        name : z.string()
    })
    
    const query = SearchSchema.safeParse(req.query)
    if(!query.success) return res.json({ error : 'Dados invalidos' })

    const search = await user.getSearch(query.data.name)
    if(search) return res.json({ search }) 
    
    res.json({ error : 'Houve um erro' })
}

    