import { RequestHandler } from "express";
import { z } from "zod";

import * as auth from '../services/auth'

export const login : RequestHandler = async (req, res) => {
    const loginSchema = z.object({
        email : z.string(),
        password: z.string()
    })
    const body = loginSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados invãlidos!' })
    const userReturn = await auth.loginUser(body.data.email, body.data.password)
    console.log("USER => ", userReturn) 
    if(!userReturn) return  res.status(403).json({ error : 'Acesso Negado' })
    res.json({ userReturn })
}

export const validate : RequestHandler = async (req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({ error : 'Acesso negado' })
    if(!req.headers.id) return res.status(403).json({ error : 'Acesso negado' })
    const idUser = req.headers.id 
    const token = req.headers.authorization.split(' ')[1]
    if(! await auth.validadeToken(idUser.toString(), token)) return res.json({ error : 'Acesso Negado' })
    next()
} 