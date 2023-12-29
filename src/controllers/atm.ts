import { RequestHandler } from "express";
import * as atm from '../services/atm'

export const getAll : RequestHandler = async (req, res) => {
    const items = await atm.getAll()
    if(items) return res.json({ atms : items })

    res.json({ error : 'Erro ao retornar ATMs' })
}