import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { productsRoutes } from './routes/productsRoutes'

const app = fastify()

app.register(cookie)
app.register(productsRoutes, {
  prefix: 'products',
})

app.listen({ port: env.PORT }).then(() => console.log('Http server is running'))
