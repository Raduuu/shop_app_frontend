import { all } from 'redux-saga/effects'
import { saga as productSaga } from './products'
import { saga as categoriesSaga } from './categories'

export default function* rootSaga() {
    yield all([productSaga(), categoriesSaga()])
}
