import { table } from 'console'
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.text('description').after('name').notNullable()
    table.double('price').after('description').notNullable()
    table.integer('quantity').after('price').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    table.dropColumn('description')
    table.dropColumn('price')
    table.dropColumn('quantity')
  })
}
