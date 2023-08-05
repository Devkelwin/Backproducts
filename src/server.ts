import express from 'express'
import { prismaClient } from './database'

const app = express()
app.use(express.json())

const port = process.env.PORT ?? 4000

app.get('/products', async (request, response) => {
  const products = await prismaClient.products.findMany()
  return response.json(products)
})

app.post('/products', async (request, response) => {
  const { product_id,product_name,actual_price,img_link,about_product } = request.body
  const products = await prismaClient.products.create({
    data: {
      product_id,
      product_name,
      actual_price,
      img_link,
      about_product
    },
  })
  return response.json(products)
})

app.listen(port, () => console.log('Server is running on port ', port))
