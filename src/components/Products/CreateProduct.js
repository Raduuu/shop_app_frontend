import React, { useState } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'

const handleSubmit = (ev, name, quantity, description) => {
    ev.preventDefault()
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    console.log('BearerToken', BearerToken)
    const body = {
        name,
        quantity,
        description,
        BearerToken,
    }
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    axios({
        url: 'http://localhost:9000/api/item',
        method: 'POST',
        headers: headers,
        data: JSON.stringify(body),
    })
        // .then(res => res.text())
        .then(res => {
            console.log('res', res)
            // this.setState({ apiResponse: res })
            // if (JSON.parse(this.state.apiResponse).token && this.props.type === 'login') {
            //     this.props.setIsLoggedIn(JSON.parse(this.state.apiResponse).token)
            //     this.props.setIsAdmin(JSON.parse(this.state.apiResponse).admin)
            //     this.props.history.push('/')
            // }
        })
}

const CreateItem = () => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')

    return (
        <form noValidate>
            <input type="text" name="name" onChange={ev => setName(ev.target.value)} />
            <input type="text" name="quantity" onChange={ev => setQuantity(ev.target.value)} />
            <textarea
                name="description"
                width="300"
                height="100"
                onChange={ev => setDescription(ev.target.value)}
            ></textarea>
            <button type="submit" onClick={ev => handleSubmit(ev, name, quantity, description)}>
                Create
            </button>
        </form>
    )
}

export default CreateItem
