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
        id_system : z.string(),
        name_full : z.string(),
        shortened_name : z.string(),
        id_treasury : z.string()
    })

    const body = atmSchema.safeParse(req.body)

    if(!body.success) return res.json({ error : 'Dados inválidos' })
    const data = {
        id_system : parseInt(body.data.id_system),
        name_full : body.data.name_full,
        shortened_name : body.data.shortened_name,
        id_treasury : parseInt(body.data.id_treasury),
    }
    if(!await atm.createAtm(data)) return res.json({ error : 'Erro ao salvar Atm' })
    res.json({ success : 'ATM Cadastrado' })
}

export const updateAtm : RequestHandler = async (req, res) => {
    const { id } = req.params

    const atmRequeried = atm.getOne(parseInt(id))
    if(!atmRequeried) return res.json({ error : 'Erro ao buscar ATM.' })

    res.json({ atm : atmRequeried })
}