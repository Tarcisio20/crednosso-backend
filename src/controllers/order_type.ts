import { RequestHandler } from "express";
import * as orderType from '../services/order_type'
import { z } from "zod";

export const getAll : RequestHandler = async (req, res) => {
    const items = orderType.getAll()
    if(!items) return res.json({ error : 'Erro ao retornar os Tipos de Ordem' })

    res.json({ orderTypes : items })
}

export const create : RequestHandler = async (req, res) => {
    const orderTypeSchema = z.object({
        name_full : z.string()
    })

    const body = orderTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos' })
    const orderTypeCreate = orderType.create(body.data)
    if(!orderTypeCreate) return res.json({ error : 'Erro ao salvar um Tipo de Ordem' })
    res.json({ success : 'Tipo de Ordem cadastrada!', orderType : orderTypeCreate})
}