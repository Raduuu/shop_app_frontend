import { SET_TOKEN, REMOVE_TOKEN } from '../actions/token'

const token = (state = [], action) => {
    switch (action.type) {
        case SET_TOKEN:
            return [...state, action.token]
        case REMOVE_TOKEN:
            return state
        default:
            return state
    }
}

export default token
