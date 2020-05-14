import { OPEN_MODAL, CLOSE_MODAL } from '../constants'

const openModal = () => ({
    type: OPEN_MODAL,
})

const closeModal = () => ({
    type: CLOSE_MODAL,
})

export { openModal, closeModal }
