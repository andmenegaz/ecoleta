import knex from '../database/connection'
import { Request, Response } from 'express'

export default class PointsController {
    async show(request: Request, response: Response) {
        const { id } = request.params

        const point = await knex('points').where('id', id).first()

        if (!point) {
            return response.status(400).json({ message: "Point Not Found" })
        }
        else {


            const serializedPoint = {
                ...point,
                image: `https://192.168.0.113:3001/uploads/${point.image}`
            }


            const items = await knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', id)
                .select('items.title')

            return response.json({ point: serializedPoint, items })
        }

    }

    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query

        const parsedItems = String(items)
            .split(',')
            .map(item => item.trim())


        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*')

        const serializedPoint = points.map(point => {
            return {
                ...point,
                image: `/uploads/${point.image}`
            }
        })

        return response.json(serializedPoint)
    }


    async create(request: Request, response: Response) {
        console.log(request.body)
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body

        let point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        await knex.transaction(async trx => {
            return await trx('points')
                .insert(point)
                .returning('id')
                .then(async insertedIds => {
                    const point_id = insertedIds[0]

                    const pointItems = items
                        .split(',')
                        .map((item: string) => Number(item.trim()))
                        .map((item_id: number) => {
                            return {
                                item_id,
                                point_id
                            }
                        })

                    await trx('point_items').insert(pointItems)

                    return {
                        id: point_id,
                        ...point
                    }
                })
        }).then(resp => {
            return response.json(resp);
        }).catch(error => {
            return response.json(error);
        })
    }
}