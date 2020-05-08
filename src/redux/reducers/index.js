import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import token from './token'
import { reducer as products } from './products'
import { reducer as categories } from './categories'
import sagas from './sagas'

export const rootReducer = combineReducers({
    token,
    products,
    categories,
})
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
)

// then run the saga
sagaMiddleware.run(sagas)

export default store
