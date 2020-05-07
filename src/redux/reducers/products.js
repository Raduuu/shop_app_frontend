import { call, put, takeLatest } from 'redux-saga/effects'
import { CREATE_PRODUCT_REQUESTED, CREATE_PRODUCT_SUCCEEDED, CREATE_PRODUCT_FAILED } from '../constants'
import { post } from '../utils/utils'

const reducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_PRODUCT_SUCCEEDED:
            return [...state, action.payload]
        default:
            return state
    }
}

function* createProduct(action) {
    try {
        yield call(post, action.payload, 'api/product')
        yield put({ type: CREATE_PRODUCT_SUCCEEDED, payload: action.payload })
    } catch {
        yield put({ type: CREATE_PRODUCT_FAILED })
    }
}

function* saga() {
    yield takeLatest(CREATE_PRODUCT_REQUESTED, createProduct)
}

export { saga, reducer }
