import { expect, test, beforeAll, afterAll, describe } from 'vitest'
import { Request } from 'supertest'
import { app } from '../src/app'
import { beforeEach } from 'node:test'
import { execSync } from 'node:child_process'

describe('products routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test.todo('user can create new product', async () => {})
  test.todo('user can delete product', async () => {})
  test.todo('user can update product', async () => {})
  test.todo('user can see especific product', async () => {})
  test.todo('user can see all products', async () => {})
  test.todo('user can see all products created by one user', async () => {})
})
