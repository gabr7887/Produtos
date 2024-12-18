// eslint-disable-next-line
import { Knex } from "knex"

declare module 'knex/types/tables' {
  export interface Tables {
    products: {
      id: string
      name: string
      description: string
      price: number
      quantity: number
      user_id: string
    }
  }
}
