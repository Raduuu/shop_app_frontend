import React from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import styled from 'styled-components'
import { get } from '../../utils/utils'

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
        box-sizing: border-box;
    }
`

class CreateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            quantity: '',
            description: '',
            categories: [],
            category: '',
        }
    }

    componentDidMount() {
        get('api/category', (res) => {
            res && this.setState({ categories: res.data.data })
        })
    }

    handleSelect = (ev) => {
        this.setState({ category: ev.target.value })
    }

    handleSubmit = (ev) => {
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
        }).then((res) => {
            updateProducts(res.data)
            this.setState({
                name: '',
                quantity: '',
                price: '',
                description: '',
                category: '',
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
                    onChange={(ev) => this.setState({ name: ev.target.value })}
                    value={this.state.name}
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Product quantity"
                    onChange={(ev) => this.setState({ quantity: ev.target.value })}
                    value={this.state.quantity}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={(ev) => this.setState({ price: ev.target.value })}
                    value={this.state.price}
                />
                <textarea
                    name="description"
                    width="300"
                    height="100"
                    onChange={(ev) => this.setState({ description: ev.target.value })}
                    placeholder="Product description"
                    value={this.state.description}
                ></textarea>
                <select onChange={(ev) => this.handleSelect(ev)}>
                    <option>Pick a category...</option>
                    {this.state.categories &&
                        this.state.categories.map((category, index) => <option key={index}>{category.name}</option>)}
                </select>
                <button
                    type="submit"
                    disabled={
                        this.state.name === '' ||
                        this.state.quantity === '' ||
                        this.state.price === '' ||
                        this.state.description === ''
                    }
                    onClick={(ev) => this.handleSubmit(ev)}
                >
                    Create
                </button>
            </StyledForm>
        )
    }
}

export default CreateProduct
