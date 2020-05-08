export const SET_TOKEN = 'SET_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'

export const setToken = (token) => ({
    type: SET_TOKEN,
    token,
})

export const removeToken = (token) => ({
    type: REMOVE_TOKEN,
    token,
})
