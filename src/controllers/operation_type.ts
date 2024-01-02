import { RequestHandler } from "express";
import * as operationType from '../services/operation_type'
import {  z } from "zod";

export const getAll : RequestHandler = async (req, res) => {
    const items = await operationType.getAll()
    if(!items) return res.json({ error : 'Dados inválidos' })
    res.json({ operationType : items })
}

export const create : RequestHandler = async (req, res) => {
    const operationTypeSchema = z.object({
        name_full : z.string()
    })

    const body = operationTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos' })
    const operationTypeCreate = await operationType.createOperationType(body.data)
    if(!operationTypeCreate) return res.json({ error : 'Problemas a salvar o Tipo de Operação, favor tentar mais tarde!' })

    res.json({ success : "Tipo de Operação cadastrada", operationType : operationTypeCreate })
}

export const getOperartionType : RequestHandler = async (req, res) => {
    const { id } = req.params

    const operationTypeOne = await operationType.getOne(parseInt(id))
    if(!operationTypeOne) return res.json({ error : 'Erro ao retornar o Tipo de Operação' })

    res.json({ operationType : operationTypeOne })
}