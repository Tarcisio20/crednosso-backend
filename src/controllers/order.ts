import { RequestHandler } from "express";
import {  z } from "zod";
import * as order from '../services/order'
import { TransformData } from "../utils/TransformData";

export const getAll : RequestHandler = async (req, res) => {
    const items = await order.getAll()
    if(!items) return res.json({ error : 'Erro ao retornar os Pedidos.' })

    res.json({ orders : items })
}

export const create : RequestHandler = async (req, res) => {
    console.log("Dentro do create")
    const orderSchema = z.object({
        order_date : z.string(),
        batch : z.string().transform(Number),
        id_origin_treasury : z.string().transform(Number),
        id_destiny_treasury : z.string().transform(Number),
        id_operation_type : z.string().transform(Number),
        id_order_type : z.string().transform(Number),
        batch_treasury : z.string().transform(Number),
        value_requested_10 : z.string().transform(Number),
        value_requested_20 : z.string().transform(Number),
        value_requested_50 : z.string().transform(Number),
        value_requested_100 : z.string().transform(Number),
        id_confirmation : z.string().transform(Number),
        observation : z.string()
    })

    const body = orderSchema.safeParse(req.body)
    console.log("DENTRO DO BACKEND")
    console.log(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos.' })
    const data = {
        order_date :  TransformData(body.data.order_date) ,
        batch : body.data.batch,
        id_origin_treasury : body.data.id_origin_treasury,
        id_destiny_treasury : body.data.id_destiny_treasury,
        id_operation_type : body.data.id_operation_type,
        id_order_type : body.data.id_order_type,
        batch_treasury : body.data.batch_treasury,
        value_requested_10 : body.data.value_requested_10,
        value_requested_20 : body.data.value_requested_20,
        value_requested_50 : body.data.value_requested_50,
        value_requested_100 : body.data.value_requested_100,
        id_status_confirmation_order: body.data.id_confirmation,
        observation : body.data.observation 
    }
     body.data.order_date = TransformData(body.data.order_date)    
    const orderCreate = await order.create( data )
    if(!orderCreate) return res.json({ error : 'Erro ao salvar Pedido' })

    res.json({ success : 'Pedido Salvo', order : orderCreate})
}

export const getOrder : RequestHandler = async (req, res) => {
    const { id } = req.params

    const OneOrder = await order.getOne(parseInt(id))
    if(!OneOrder) return res.json({ error : 'Erro ao retornar um Pedido' })

    res.json({ order : OneOrder })
}

export const updateOrder : RequestHandler = async (req, res) => {
    const { id } = req.params

    const orderSchema = z.object({
        value_of_10 : z.string().transform(Number).optional(),
        value_of_20 : z.string().transform(Number).optional(),
        value_of_50 : z.string().transform(Number).optional(),
        value_of_100 : z.string().transform(Number).optional(),
        observation : z.string().optional()
    })

    const body = orderSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : "Dados inválidos" })

    const updatedOrder = await order.update( parseInt(id), body.data )
    if(!updatedOrder) return res.json({ error : 'Erro ao editar Pedido' })

    res.json({ success : 'Pedido Editado com sucesso', order : updatedOrder })
}

export const deleteOrder : RequestHandler = async (req, res) => {
    const { id } = req.params
    

    const deletedOrder = await order.remove(parseInt(id))
    if(!deletedOrder) return res.json({error : 'Erro ao deletar esse Pedido' })

    res.json({ success : 'Pedido deletado com sucesso', order : deletedOrder })
}

export const searchOrder : RequestHandler = async (req, res) => {
    const searchSchema = z.object({
        batch : z.string().transform(Number)
    })

    const query = searchSchema.safeParse(req.query)
    if(!query.success) return res.json('Erro ao retornar')
    const search = await order.search(query.data.batch)
    if(!search) return res.json({ error :  'Houve um erro em retornar a sua pesquisa, favor tentar mais tarde!' })

    res.json({ order : search })
}