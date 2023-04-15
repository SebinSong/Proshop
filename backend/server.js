const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const productsJSON = require('./data/products.json')

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const {
  API_PORT = 5000,
  NODE_ENV = 'development'
} = process.env
const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/products', (req, res) => {
  res.json(productsJSON)
})

app.get('/product/:id', (req, res) => {
  const targetId = req.params.id
  const found = productsJSON.find(item => item._id === targetId)

  if (found) { res.json(found) }
  else { res.status(404).send(' you are looking for was not found.') }
})

app.listen(API_PORT, () => { console.log(`Server running in ${NODE_ENV} mode on port ${API_PORT}.`) })
