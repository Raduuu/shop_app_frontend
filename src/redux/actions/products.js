import { call, put, takeLatest } from 'redux-saga/effects'
import { CREATE_PRODUCT_REQUESTED, CREATE_PRODUCT_SUCCEEDED, CREATE_PRODUCT_FAILED } from './constants'

function* createProduct(action) {
    try {
        const product = yield call('api/product', action.payload)
        yield put({ type: CREATE_PRODUCT_SUCCEEDED, product: product })
    } catch {
        yield put({ type: CREATE_PRODUCT_FAILED })
    }
}

function* saga() {
    yield takeLatest(CREATE_PRODUCT_REQUESTED, createProduct)
}

export default saga

// To run our Saga, we'll have to connect it to the Redux Store using the redux-saga middleware.
