import { call, put, takeLatest } from 'redux-saga/effects'
import {
    CREATE_PRODUCT_REQUESTED,
    CREATE_PRODUCT_SUCCEEDED,
    CREATE_PRODUCT_FAILED,
    GET_PRODUCTS_REQUESTED,
    GET_PRODUCTS_SUCCEEDED,
    GET_PRODUCTS_FAILED,
    EDIT_PRODUCT_REQUESTED,
    EDIT_PRODUCT_SUCCEEDED,
    EDIT_PRODUCT_FAILED,
} from '../constants'
import { post, get, update } from '../utils/utils'

const reducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_SUCCEEDED:
            return { ...state, [action.payload.id]: action.payload, success: true }
        case CREATE_PRODUCT_FAILED:
            return { ...state, success: false }
        case GET_PRODUCTS_SUCCEEDED:
            return { ...state, products: action.payload.data, count: action.payload.count }
        case GET_PRODUCTS_FAILED:
            return state
        case EDIT_PRODUCT_SUCCEEDED:
            return {
                ...state,
                products: [...state.products, action.payload.data],
            }
        case EDIT_PRODUCT_FAILED:
            return state
        default:
            return state
    }
}

// selectors
const selectProducts = (state) => state.products.products
const selectCount = (state) => state.products.count

// sagas
function* createProduct(action) {
    try {
        yield call(post, action.payload, 'api/product')
        yield put({ type: CREATE_PRODUCT_SUCCEEDED, payload: action.payload })
    } catch {
        yield put({ type: CREATE_PRODUCT_FAILED })
    }
}

function* getProducts(action) {
    try {
        let url = 'api/product'
        if (action.payload) {
            url += '?'
            for (let parameter in action.payload) {
                url += `${parameter}=${action.payload.parameter}`
            }
        }
        const products = yield call(get, url)
        yield put({ type: GET_PRODUCTS_SUCCEEDED, payload: products })
    } catch {
        yield put({ type: GET_PRODUCTS_FAILED })
    }
}

function* editProduct(action) {
    try {
        debugger
        const editedProduct = yield call(update, `api/product/${action.payload._id}`)
        yield put({ type: EDIT_PRODUCT_SUCCEEDED, payload: editedProduct })
    } catch {
        yield put({ type: EDIT_PRODUCT_FAILED })
    }
}

function* saga() {
    yield takeLatest(CREATE_PRODUCT_REQUESTED, createProduct)
    yield takeLatest(GET_PRODUCTS_REQUESTED, getProducts)
    yield takeLatest(EDIT_PRODUCT_REQUESTED, editProduct)
}

export { saga, reducer, selectProducts, selectCount }
