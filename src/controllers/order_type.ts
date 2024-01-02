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

export const getOrderType : RequestHandler = async (req, res) => {
    const { id } = req.params

    const OrderTypeOne = await orderType.getOne(parseInt(id))
    if(!OrderTypeOne) return res.json({ error : 'Erro ao retornar o Tipo de Ordem' })

    res.json({ orderType : OrderTypeOne })
}

export const updateOrderType : RequestHandler = async (req, res) => {
    const { id } = req.params

    const orderTypeSchema = z.object({
        name_full : z.string().optional(),
        status : z.boolean().optional()
    })

    const body = orderTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos!' })

    const updatedOrderType = await orderType.update(parseInt(id), body.data)
    if(!updatedOrderType) return res.json({ error : 'Erro ao editar o Tipo de Ordem' })

    res.json({ success : 'Tipo de ordem atualizada com sucesso!', orderType : updatedOrderType })
}

export const deleteOrderType : RequestHandler = async (req, res) => {
    const { id } = req.params

    const deletedOrderType = await orderType.remove(parseInt(id))
    if(!deletedOrderType) return res.json({ error : 'Erro ao deletar o tipo de Ordem' })

    res.json({ success :  'Tipo de Ordem deletado com sucesso' })
}

export const searchOrderType : RequestHandler = async (req, res) => {
    const  searchSchema = z.object({
        name : z.string()
    })

    const query = searchSchema.safeParse(req.query)
    if(!query.success) return res.json({ error : 'Dados inválidos' })
    const search = await orderType.search(query.data.name)
    if(!search) return res.json({ error : 'Erro ao retornar os Tipos de Ordem' })

    res.json({ orderTypes : search })
}