import React, { useState } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import styled from 'styled-components'

export const StyledForm = styled.form`
    display: block;
    width: 400px;
    margin-top: 100px;
    margin-left: 50%;
    transform: translateX(-50%);
    * {
        display: block;
        width: 100%;
        margin-bottom: 15px;
    }
    input,
    textarea {
        font-size: 16px;
        line-height: 24px;
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #b7aaaa;
    }
    button[type='submit'] {
        width: auto;
        padding: 4px 24px;
        font-size: 16px;
        line-height: 24px;
        background-color: white;
        -webkit-appearance: none;
    }
`

class CreateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            quantity: '',
            description: '',
        }
    }

    handleSubmit = ev => {
        const { updateProducts } = this.props
        ev.preventDefault()
        const token = Cookie.get('token') ? Cookie.get('token') : null
        const BearerToken = `Bearer ${token}`
        const body = {
            ...this.state,
            BearerToken,
        }
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        axios({
            url: 'http://localhost:9000/api/product',
            method: 'POST',
            headers: headers,
            data: JSON.stringify(body),
        }).then(res => {
            updateProducts(res.data)
            this.setState({
                name: '',
                quantity: '',
                description: '',
            })
        })
    }

    render() {
        return (
            <StyledForm noValidate>
                <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    onChange={ev => this.setState({ name: ev.target.value })}
                    value={this.state.name}
                />
                <input
                    type="text"
                    name="quantity"
                    placeholder="Product quantity"
                    onChange={ev => this.setState({ quantity: ev.target.value })}
                    value={this.state.quantity}
                />
                <textarea
                    name="description"
                    width="300"
                    height="100"
                    onChange={ev => this.setState({ description: ev.target.value })}
                    placeholder="Product description"
                    value={this.state.description}
                ></textarea>
                <button
                    type="submit"
                    disabled={this.state.name === '' || this.state.quantity === '' || this.state.description === ''}
                    onClick={ev => this.handleSubmit(ev)}
                >
                    Create
                </button>
            </StyledForm>
        )
    }
}

export default CreateProduct
