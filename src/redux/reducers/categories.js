import { call, put, takeLatest } from 'redux-saga/effects'
import { CATEGORIES_FAILED, CATEGORIES_REQUESTED, CATEGORIES_SUCCEEDED } from '../constants'
import { get } from '../utils/utils'

const reducer = (state = {}, action) => {
    switch (action.type) {
        case CATEGORIES_SUCCEEDED:
            return {
                ...state,
                categories: action.categories,
            }
        case CATEGORIES_FAILED:
            return state
        default:
            return state
    }
}

// selectors

const selectCategories = (state) => state.categories.categories && state.categories.categories.data

// sagas
function* getCategories() {
    try {
        const categories = yield call(get, 'api/category')
        yield put({ type: CATEGORIES_SUCCEEDED, categories: categories })
    } catch {
        yield put({ type: CATEGORIES_FAILED })
    }
}

function* saga() {
    yield takeLatest(CATEGORIES_REQUESTED, getCategories)
}

export { saga, reducer, selectCategories }
