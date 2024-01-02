import { RequestHandler } from "express";
import * as treasury from '../services/treasury'
import { z } from "zod";


export const getAll : RequestHandler = async (req, res) => {
    const items = await treasury.getAll()
    if(items) return res.json({ atms : items })

    res.json({ error : 'Erro ao retornar Transportados' })
}

export const create : RequestHandler = async (req, res) => {
    const treasurySchema = z.object({
        id_system : z.string().transform(Number),
        name_full : z.string(),
        shortened_name : z.string(),
        balance_cass_10 : z.string().transform(parseFloat),
        balance_cass_20 : z.string().transform(parseFloat),
        balance_cass_50 : z.string().transform(parseFloat),
        balance_cass_100 : z.string().transform(parseFloat),
    })

    const body = treasurySchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos' })
    if(!treasury.createTreasury( body.data ))  return res.json({ error : 'Erro ao salvar Tesouraria' })
    
    res.json({ success : 'Tesouraria Cadastrada' })
}