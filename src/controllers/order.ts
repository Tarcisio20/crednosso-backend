import { RequestHandler } from "express";
import * as order from '../services/order'

export const getAll : RequestHandler = async (req, res) => {
    const items = await order.getAll()
    if(!items) return res.json({ error : 'Erro ao retornar os Pedidos.' })

    res.json({ orders : items })
}