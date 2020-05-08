import { CREATE_PRODUCT_REQUESTED, GET_PRODUCTS_REQUESTED } from '../constants'

const createProduct = (payload) => ({
    type: CREATE_PRODUCT_REQUESTED,
    payload,
})

const getProducts = () => ({
    type: GET_PRODUCTS_REQUESTED,
})

export { createProduct, getProducts }
