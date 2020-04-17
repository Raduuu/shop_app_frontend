import axios from 'axios'
import Cookie from 'js-cookie'

const createPrerequisites = () => {
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }
    return {
        token,
        headers,
    }
}

export const create = ({ body, url, callback }) => {
    const { headers } = createPrerequisites()
    axios({
        url: `http://localhost:9000/${url}`,
        method: 'POST',
        headers: headers,
        data: JSON.stringify(body),
    }).then((res) => {
        callback(res)
    })
}

export const get = (url, callback) => {
    const { headers } = createPrerequisites()
    axios({
        url: `http://localhost:9000/${url}`,
        method: 'GET',
        headers: headers,
    }).then((res) => {
        callback(res)
    })
}

export const update = ({ url, body, callback }) => {
    const { headers } = createPrerequisites()

    axios.put(`http://localhost:9000/${url}`, body, { headers: headers }).then((res) => {
        callback(res)
    })
}

export const remove = ({ body, url, callback }) => {
    const { headers } = createPrerequisites()

    axios({
        url: `http://localhost:9000/api/${url}`,
        method: 'DELETE',
        headers: headers,
        body: body,
    }).then((res) => {
        callback(res)
    })
}

export default {
    create,
    get,
    update,
    remove,
}
