import { OPEN_MODAL, CLOSE_MODAL } from '../constants'

const reducer = (state = [], action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                cartModal: true,
            }
        case CLOSE_MODAL:
            return {
                ...state,
                cartModal: false,
            }
        default:
            return state
    }
}

export { reducer }
