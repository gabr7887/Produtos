import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
  client: 'sqLite',
  connection: {
    filename: './app.db',
  },
})
