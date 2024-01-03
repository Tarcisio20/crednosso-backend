import { RequestHandler } from "express";
import * as order from '../services/order'
import { date, z } from "zod";
import { TransformData } from "../utils/TransformData";
import { parse, isValid } from 'date-fns';

export const getAll : RequestHandler = async (req, res) => {
    const items = await order.getAll()
    if(!items) return res.json({ error : 'Erro ao retornar os Pedidos.' })

    res.json({ orders : items })
}

export const create : RequestHandler = async (req, res) => {
    const orderSchema = z.object({
        order_date : z.string(),
        batch : z.string().transform(Number),
        id_origin_treasury : z.string().transform(Number),
        id_destiny_treasury : z.string().transform(Number),
        id_operation_type : z.string().transform(Number),
        id_order_type : z.string().transform(Number),
        batch_treasury : z.string().transform(Number),
        value_of_10 : z.string().transform(Number),
        value_of_20 : z.string().transform(Number),
        value_of_50 : z.string().transform(Number),
        value_of_100 : z.string().transform(Number),
        observation : z.string()
    })

    const body = orderSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos.' })
    const data = {
        order_date :  TransformData(body.data.order_date) ,
        batch : body.data.batch,
        id_origin_treasury : body.data.id_origin_treasury,
        id_destiny_treasury : body.data.id_destiny_treasury,
        id_operation_type : body.data.id_operation_type,
        id_order_type : body.data.id_order_type,
        batch_treasury : body.data.batch_treasury,
        value_of_10 : body.data.value_of_10,
        value_of_20 : body.data.value_of_20,
        value_of_50 : body.data.value_of_50,
        value_of_100 : body.data.value_of_100,
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