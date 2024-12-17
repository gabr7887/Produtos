import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export async function productsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const products = await knex('products').select('*')
    return {
      products,
    }
  })

  app.get('/:id', async (request) => {
    const getProductParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getProductParamsSchema.parse(request.params)

    const product = await knex('products').where('id', id).first()

    return {
      product,
    }
  })

  app.post('/create', async (request, reply) => {
    const createProductBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      quantity: z.number(),
    })

    const { name, description, price, quantity } =
      createProductBodySchema.parse(request.body)

    await knex('products').insert({
      id: randomUUID(),
      name,
      description,
      price,
      quantity,
    })

    reply.status(201).send()
  })

  app.delete('/:id', async (request, reply) => {
    const getProductParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getProductParamsSchema.parse(request.params)

    await knex('products').where('id', id).first().delete()

    reply.status(204).send()
  })
}
