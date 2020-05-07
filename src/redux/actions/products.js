import { CREATE_PRODUCT_REQUESTED } from '../constants'

const createProduct = (payload) => ({
    type: CREATE_PRODUCT_REQUESTED,
    payload,
})

export { createProduct }
