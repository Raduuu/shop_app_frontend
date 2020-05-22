import {
    FORGOT_PASSWORD_REQUESTED,
    FORGOT_PASSWORD_SUCCEEDED,
    FORGOT_PASSWORD_FAILED,
    CHANGE_PASSWORD_SUCCEEDED,
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_REQUESTED,
} from '../constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import { post } from '../utils/utils'

const reducer = (state, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_SUCCEEDED:
            return state
        default:
            return state
    }
}

function* forgotPassword(action) {
    try {
        const response = yield call(post, action.payload, 'forgotpassword')
        yield put({ type: FORGOT_PASSWORD_SUCCEEDED, payload: response })
    } catch {
        yield put({ type: FORGOT_PASSWORD_FAILED })
    }
}

function* changePassword(action) {
    try {
        const response = yield call(post, action.payload, 'changepassword')
        yield put({ type: CHANGE_PASSWORD_SUCCEEDED, payload: response })
    } catch {
        yield put({ type: CHANGE_PASSWORD_FAILED })
    }
}

function* saga() {
    yield takeEvery(FORGOT_PASSWORD_REQUESTED, forgotPassword)
    yield takeEvery(CHANGE_PASSWORD_REQUESTED, changePassword)
}

export { saga, reducer }
