import { test, beforeAll, afterAll, describe, beforeEach, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
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

  test('user can see all products created by one user', async () => {
    const createProductResponse = await request(app.server)
      .post('/products/create')
      .send({
        name: 'testeUser3',
        description:
          'primeiro teste realizado logo após implementar a rota put',
        price: 147244,
        quantity: 4,
      })

    const cookies = createProductResponse.get('Set-Cookie')
    const formatedCookie = cookies ? cookies[0].slice(7, 43) : ''
    await request(app.server)
      .get(`/products/user/${formatedCookie}`)
      .expect(200)
  })

  test('user can create new product', async () => {
    await request(app.server)
      .post('/products/create')
      .send({
        name: 'testeUser3',
        description:
          'primeiro teste realizado logo após implementar a rota put',
        price: 147244,
        quantity: 4,
      })
      .expect(201)
  })

  test('user can delete product', async () => {
    await request(app.server).post('/products/create').send({
      name: 'testeUser3',
      description: 'primeiro teste realizado logo após implementar a rota put',
      price: 147244,
      quantity: 4,
    })

    const productsResponse = await request(app.server)
      .get('/products')
      .expect(200)

    const productId = productsResponse.body.products[0].id

    await request(app.server).delete(`/products/${productId}`).expect(204)
  })

  test('user can update product', async () => {
    await request(app.server).post('/products/create').send({
      name: 'testeUser3',
      description: 'primeiro teste realizado logo após implementar a rota put',
      price: 147244,
      quantity: 4,
    })

    const productsResponse = await request(app.server)
      .get('/products')
      .expect(200)

    const productId = productsResponse.body.products[0].id

    await request(app.server)
      .put(`/products/${productId}`)
      .send({
        name: 'testeUser4',
        description: 'primeiro teste r',
        price: 147244,
        quantity: 4,
      })
      .expect(200)
  })

  test('user can see especific product', async () => {
    await request(app.server).post('/products/create').send({
      name: 'testeUser3',
      description: 'primeiro teste realizado logo após implementar a rota put',
      price: 147244,
      quantity: 4,
    })

    const productsResponse = await request(app.server)
      .get('/products')
      .expect(200)

    const productId = productsResponse.body.products[0].id

    const response = await request(app.server)
      .get(`/products/${productId}`)
      .expect(200)

    expect(response.body.product).toEqual(
      expect.objectContaining({
        name: 'testeUser3',
        description:
          'primeiro teste realizado logo após implementar a rota put',
        price: 147244,
        quantity: 4,
      }),
    )
  })

  test('user can see all products', async () => {
    await request(app.server).post('/products/create').send({
      name: 'testeUser3',
      description: 'primeiro teste realizado logo após implementar a rota put',
      price: 147244,
      quantity: 4,
    })

    await request(app.server).get('/products').expect(200)
  })
})
