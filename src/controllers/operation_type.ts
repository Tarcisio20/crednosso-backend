import { RequestHandler } from "express";
import * as operationType from '../services/operation_type'
import { boolean, string, z } from "zod";

export const getAll : RequestHandler = async (req, res) => {
    const items = await operationType.getAll()
    if(!items) return res.json({ error : 'Dados inválidos' })
    res.json({ operationType : items })
}

export const create : RequestHandler = async (req, res) => {
    const operationTypeSchema = z.object({
        name_full : string(),
        status : boolean()
    })

    const body = operationTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos' })
    const operationTypeCreate = await operationType.createOperationType(body.data)
    if(!operationTypeCreate) return res.json({ error : 'Problemas a salvar o Tipo de Operação, favor tentar mais tarde!' })
}