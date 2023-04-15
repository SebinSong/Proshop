import axios from 'axios'

const axiosRequest = axios.create({
  timeout: 12 * 1000,
  baseURL: APP_MODE === 'development' ? '/api' : ''
})

export const getProducts = (opts) => axiosRequest.get('/products', opts).then(res => res.data)
export const getProduct = (id) => axiosRequest.get(`/product/${id}`).then(res => res.data)
