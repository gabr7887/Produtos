import fastify from 'fastify'
import { env } from './env'
import { productsRoutes } from './routes/productsRoutes'

const app = fastify()
app.register(productsRoutes, {
  prefix: 'products',
})

app.listen({ port: env.PORT }).then(() => console.log('Http server is running'))
