import { RequestHandler } from "express";

import * as supply from '../services/supply'
import { z } from "zod";
import { TransformData } from "../utils/TransformData";

export const getAll : RequestHandler = async (req, res) => {
    const supplys = await supply.getAll()
    if(!supplys) return res.json({ error : 'Erro ao retornar os abastecimentos' })

    res.json({ supplys : supplys })
}

export const create : RequestHandler = async (req, res) => {
    const supplySchema = z.object({
        id_atm : z.string().transform(Number),
        supply_date : z.string(),
        value_of_10 : z.string().transform(Number),
        value_of_20 : z.string().transform(Number),
        value_of_50 : z.string().transform(Number),
        value_of_100 : z.string().transform(Number)
    })
    const body = supplySchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados invalidos'})
    const data = {
        id_atm : body.data.id_atm,
        supply_date : TransformData(body.data.supply_date),
        value_of_10 : body.data.value_of_10,
        value_of_20 : body.data.value_of_20,
        value_of_50 : body.data.value_of_50,
        value_of_100 : body.data.value_of_100
    } 
    const supplyCreate = await supply.create(data)
    if(!supplyCreate) return res.json({ error : 'Erro ao salvar o Abastecimento' })

    res.json({ success : 'Abastecimento salvo com sucesso', supply : supplyCreate })
}

export const getSupply : RequestHandler = async (req, res) => {
    const { id } = req.params

    const supplyOne = await supply.getOne(parseInt(id))
    if(!supplyOne) return res.json({ error : 'Erro ao retornar abastecimento' })

    res.json({ supply : supplyOne })
}

export const updateSupply : RequestHandler = async (req, res) => {
    const { id } = req.params

    const supplySchema = z.object({
        value_of_10 : z.string().transform(Number).optional(),
        value_of_20 : z.string().transform(Number).optional(),
        value_of_50 : z.string().transform(Number).optional(),
        value_of_100 : z.string().transform(Number).optional()
    })
    const body = supplySchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos' })
    const updatedSupply = await supply.update(parseInt(id), body.data)
    if(!updatedSupply) return res.json({ error : 'Erro ao Editar Abastecimento' })

    res.json({ supply : updatedSupply })
}