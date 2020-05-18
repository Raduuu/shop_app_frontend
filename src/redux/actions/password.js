import { FORGOT_PASSWORD_REQUESTED, CHANGE_PASSWORD_REQUESTED } from '../constants'

export const forgotPassword = (payload) => ({
    type: FORGOT_PASSWORD_REQUESTED,
    payload: { email: payload },
})

export const changePassword = (payload) => ({
    type: CHANGE_PASSWORD_REQUESTED,
    payload,
})
