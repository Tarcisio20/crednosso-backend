import { RequestHandler } from "express";
import { z } from "zod";

import * as auth from '../services/auth'

export const login : RequestHandler = (req, res) => {
    const loginSchema = z.object({
        email : z.string(),
        password: z.string()
    })
    const body = loginSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados invãlidos!' })

    if(!auth.loginUser(body.data.email, body.data.password)) return  res.status(403).json({ error : 'Acesso Negado' })
     
    res.json({ token : auth.createToken(body.data.email) })
    

   
}

export const validate : RequestHandler = (req, res, next) => {
  /*  if(!req.headers.authorization) return res.status(403).json({ error : 'Acesso negado' })

    const token = req.headers.authorization.split(' ')[1]
    if(!auth.validadeToken(token)) return res.json({ error : 'Acesso Negado' })*/
    next()
} 