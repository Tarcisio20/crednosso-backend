import { RequestHandler } from "express";

import * as supply from '../services/supply'

export const getAll : RequestHandler = async (req, res) => {
    const supplys = await supply.getAll()
    if(!supplys) return res.json({ error : 'Erro ao retornar os abastecimentos' })

    res.json({ supplys : supplys })
}