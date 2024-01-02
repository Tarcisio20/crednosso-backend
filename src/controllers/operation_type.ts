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

export const updateOperartionType : RequestHandler = async (req, res) => {
    const { id } = req.params
    const operationTypeSchema = z.object({
        name_full : z.string().optional(),
        status : z.boolean().optional()
    })

    const body = operationTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos' })
    const items = await operationType.update(parseInt(id), body.data)
    if(!items) return res.json({ error : 'Erro ao editar o Tipo de Operação' })

    res.json({ success : 'Tipo de Operação editada com sucesso', operationType : items })
}

export const deleteOperartionType : RequestHandler = async (req, res) => {
    const{ id } = req.params

    const deletedOperationType = operationType.remove(parseInt(id))
    if(!deletedOperationType) return res.json({ error : 'Erro ao excluir um Tipo de Operação, favor tente mais tarde' })

    res.json({ success : 'Tipo de Operação excluida com sucesso' })
}

export const searchOperartionType : RequestHandler = async (req, res) => {
    const searchSchema = z.object({
        name : z.string()
    })

    const query = searchSchema.safeParse(req.query)
    if(!query.success) return res.json({ error : 'Dados inválidos' })

    const search = await operationType.search(query.data.name)

    res.json({ operationTypes : search })
}