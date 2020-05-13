import {
    CREATE_PRODUCT_REQUESTED,
    GET_PRODUCTS_REQUESTED,
    EDIT_PRODUCT_REQUESTED,
    SEARCH_PRODUCTS_REQUESTED,
} from '../constants'

const createProduct = (payload) => ({
    type: CREATE_PRODUCT_REQUESTED,
    payload,
})

const getProducts = (payload) => ({
    type: GET_PRODUCTS_REQUESTED,
    payload,
})

const editProduct = (payload) => ({
    type: EDIT_PRODUCT_REQUESTED,
    payload,
})

const searchProducts = (payload) => ({
    type: SEARCH_PRODUCTS_REQUESTED,
    payload,
})

export { createProduct, getProducts, editProduct, searchProducts }
