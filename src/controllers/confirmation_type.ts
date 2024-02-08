import { RequestHandler } from "express";
import * as confirmationType from '../services/confirmation_type'
import { z } from "zod";

export const getAll : RequestHandler = async (req, res) => {
    try{
        const items = await confirmationType.getAll()
        if(!items) return res.json({ error : 'Erro ao retornar tipos de confirmação.' })
        res.json({ confirmationTypes : items, success : 'Tipos de confirmação retornados com sucesso!' })
    }catch(err){ return false }
}

export const create : RequestHandler = async (req, res) => {
    const confirmationTypeSchema = z.object({
        name_full : z.string()
    })

    const body = confirmationTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos.' })

    const confirmationCreated = await confirmationType.create(body.data)
    if(!confirmationCreated) return res.json({ error : 'Erro ao salvar Tipo de Confirmação' })

    res.json({ success : 'Tipo de Confirmação Salva', confirmationType : confirmationCreated})
}

export const getConfirmationType : RequestHandler = async (req, res) => {
    const { id } = req.params

    const OneConfirmationType = await confirmationType.getOne(parseInt(id))
    if(!OneConfirmationType) return res.json({ error : 'Erro ao retornar as confirmações de Pedido' })

    res.json({ confirmationType : OneConfirmationType, success : 'Retorno de todos as confirmações de Pedido' })
}

export const updateConfirmationType : RequestHandler = async (req, res) => {
    const { id } = req.params

    const ConfirmationTypeSchema = z.object({
        name_full : z.string().optional(),
        status : z.boolean().optional()
    })

    const body = ConfirmationTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos.' })
    const updatedConfirmationType = await confirmationType.update(parseInt(id), body.data)
    if(!updatedConfirmationType) return res.json({ error : 'Erro ao retornar as confirmações de Pedido' })

    res.json({ confirmationType : updatedConfirmationType, success : 'Confirmação de Pedido Editado' })
}

export const deleteConfirmationType : RequestHandler = async (req, res) => {
    const { id } = req.params
    const DeleteConfirmationTypeSchema = z.object({
        id_status_confirmation_order : z.string().transform(Number),
        status : z.boolean()
    })
    const body = DeleteConfirmationTypeSchema.safeParse(req.body)
    if(!body.success) return res.json({ error : 'Dados inválidos.' })
    const deletedConfirmationType = await confirmationType.remove(parseInt(id), body.data)
    if(!deletedConfirmationType) return res.json({ error : 'Erro ao deletar o tipo de confirmação' })

    res.json({ success :  'Tipo de confirmação deletado com sucesso', confirmationType : deletedConfirmationType })
}