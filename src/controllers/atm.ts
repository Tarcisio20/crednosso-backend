import { RequestHandler } from "express";
import * as atm from '../services/atm'
import { z } from "zod";

export const getAll : RequestHandler = async (req, res) => {
    const items = await atm.getAll()
    if(items) return res.json({ atms : items })

    res.json({ error : 'Erro ao retornar ATMs' })
}

export const create : RequestHandler = async (req, res) => {
    const atmSchema = z.object({
        id_system : z.string().transform(Number),
        name_full : z.string(),
        shortened_name : z.string(),
        id_treasury : z.string().transform(Number)
    })

    const body = atmSchema.safeParse(req.body)

    if(!body.success) return res.json({ error : 'Dados inválidos' })
 
    if(!await atm.createAtm(body.data)) return res.json({ error : 'Erro ao salvar Atm' })
    res.json({ success : 'ATM Cadastrado' })
}

export const getAtm : RequestHandler = async (req, res) => {
    const { id } = req.params

    const atmRequeried = atm.getOne(parseInt(id))
    if(!atmRequeried) return res.json({ error : 'Erro ao buscar ATM.' })

    res.json({ atm : atmRequeried })
}

export const updateAtm : RequestHandler = async (req, res) => {

    const { id } = req.params
    const AtmShema = z.object({
        id_system : z.string().optional().transform(Number),
        name_full : z.string().optional(),
        shortened_name : z.string().optional(),
        id_treasury : z.string().optional().transform(Number)
    })

    const body = AtmShema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados invalidos' })

    const updatedAtm = await atm.update(parseInt(id), body.data )
    if(updatedAtm) return res.json({ atm : updateAtm }) 

    res.json({ error : 'Erro ao salvar Atm' })
}