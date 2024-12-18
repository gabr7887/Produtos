import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { productsRoutes } from './routes/productsRoutes'

export const app = fastify()

app.register(cookie)
app.register(productsRoutes, {
  prefix: 'products',
})
