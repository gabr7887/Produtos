import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app.get('/hello', () => {
  return 'hello world'
})

app.listen({ port: 3333 }).then(() => console.log('Http server is running'))
