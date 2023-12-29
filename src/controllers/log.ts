import { RequestHandler } from "express";
import * as log from '../services/log'

export const getAll : RequestHandler = async (req, res) => {
    const items = await log.getAll()
    if(items) return res.json({ logs : items })

    res.json({ error : 'Erro ao processar solicitação' })
}

export const getForUser : RequestHandler =async (req, res) => {
    const { id } = req.params

    const logForUser = await log.getForUser(parseInt(id))
    if(logForUser) return res.json({ logs : logForUser, id })

    res.json({error : 'Erro ao ao buscar Log'})
}