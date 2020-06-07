import knex from '../database/connection'
import { Request, Response } from 'express'

export default class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*')
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image: `http://192.168.0.113:3333/uploads/${item.image}`
            }
        })
    
        return response.json(serializedItems)
    }
}