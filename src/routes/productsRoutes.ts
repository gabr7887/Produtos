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

  app.get('/user/:userId', async (request) => {
    const getUserParamsSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = getUserParamsSchema.parse(request.params)

    const products = await knex('products').where('user_id', userId)

    return {
      products,
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

    let userId = request.cookies.userId

    if (!userId) {
      userId = randomUUID()

      reply.cookie('userId', userId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7days
      })
    }

    await knex('products').insert({
      id: randomUUID(),
      name,
      description,
      price,
      quantity,
      user_id: userId,
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

  app.put('/:id', async (request, reply) => {
    const getProductParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const updateProductBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      quantity: z.number(),
    })

    const { id } = getProductParamsSchema.parse(request.params)
    const data = updateProductBodySchema.parse(request.body)

    await knex('products').where('id', id).first().update(data)

    reply.status(200).send()
  })
}
