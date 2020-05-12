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

export const validateEmail = (email) => {
    // eslint-disable-next-line
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.match(mailformat)) {
        return true
    } else {
        return false
    }
}

// could be more than 1 callback
export const post = (body, url, callback, errCallback) => {
    const { headers } = createPrerequisites()
    axios({
        url: `http://localhost:9000/${url}`,
        method: 'POST',
        headers: headers,
        data: JSON.stringify(body),
    })
        .then((res) => {
            callback && callback(res)
        })
        .catch((err) => {
            errCallback ? errCallback(err) : console.error(err)
        })
}

export const get = (url, callback) => {
    const { headers } = createPrerequisites()
    return axios({
        url: `http://localhost:9000/${url}`,
        method: 'GET',
        headers: headers,
    }).then((res) => {
        callback && callback(res)
        return res.data
    })
}

export const update = (url, body, callback) => {
    const { headers } = createPrerequisites()

    return axios.put(`http://localhost:9000/${url}`, body, { headers: headers }).then((res) => {
        callback && callback(res)
        debugger
        return res.data // maybe I don't need return axios
    })
}

export const remove = (url, callback) => {
    const { headers } = createPrerequisites()

    axios({
        url: `http://localhost:9000/${url}`,
        method: 'DELETE',
        headers: headers,
    }).then((res) => {
        callback(res)
    })
}

export default {
    validateEmail,
    post,
    get,
    update,
    remove,
}
