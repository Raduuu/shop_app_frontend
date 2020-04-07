import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import axios from 'axios'
import Cookie from 'js-cookie'
import { StyledForm } from './CreateProduct'

const IconsWrapper = styled.div`
    display: block;
    div {
        display: inline-block;
        margin-right: 10px;
    }
`

const StyledIcon = styled.div`
    cursor: pointer;
`

const onEdit = ({
    ev,
    product,
    name,
    description,
    quantity,
    setName,
    setDescription,
    setEdit,
    setPrice,
    setQuantity,
    editProduct,
}) => {
    ev.preventDefault()
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }

    const body = {
        params: { id: product._id },
        createdBy: product.createdBy,
        name,
        description,
        quantity,
    }

    axios.put(`http://localhost:9000/api/product/${product._id}`, body, { headers: headers }).then((res) => {
        editProduct(res.data)
        setName('')
        setDescription('')
        setQuantity(0)
        setPrice(0)
        setEdit(false)
    })
}

const onDelete = (product, updateProducts) => {
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }

    axios({
        url: `http://localhost:9000/api/product/${product._id}`,
        method: 'DELETE',
        headers: headers,
        body: {
            _id: product._id,
        },
    }).then((res) => {
        updateProducts(res.data, 'delete')
    })
}

const addToCart = (product) => {
    let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
    let found = false
    for (let i = 0; i < cart.length; i++) {
        debugger

        if (cart[i]._id === product._id) {
            cart[i].quantity++
            found = true
        }
    }

    !found && cart.push({ _id: product._id, name: product.name, quantity: 1 })

    // let id = product._id

    // if (!cart[id]) {
    //     cart[id] = {}
    // }
    // cart[id].quantity = cart[id].quantity ? cart[id].quantity + 1 : 1
    Cookie.set('cart', cart)
    console.log('cart', Cookie.get('cart'))
}

const Product = ({ product, updateProducts, editProduct, isAdmin }) => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [edit, setEdit] = useState(false)
    const iconColor = '#FF715B'
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price} coins</p>
            <p>{product.quantity} in stock</p>
            <IconsWrapper>
                {isAdmin && (
                    <div>
                        <StyledIcon onClick={() => setEdit(!edit)}>
                            <FontAwesomeIcon icon={faEdit} color={iconColor} />
                        </StyledIcon>
                        <StyledIcon onClick={() => onDelete(product, updateProducts)}>
                            <FontAwesomeIcon icon={faTrash} color={iconColor} />
                        </StyledIcon>
                    </div>
                )}
                <StyledIcon onClick={() => addToCart(product)}>
                    <FontAwesomeIcon icon={faCartPlus} color={iconColor} />
                </StyledIcon>
            </IconsWrapper>
            {edit && (
                <StyledForm noValidate>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        onChange={(ev) => setName(ev.target.value)}
                        value={name}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Product quantity"
                        onChange={(ev) => setQuantity(ev.target.value)}
                        value={quantity}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        onChange={(ev) => setPrice(ev.target.value)}
                        value={price}
                    />
                    <textarea
                        name="description"
                        width="300"
                        height="100"
                        onChange={(ev) => setDescription(ev.target.value)}
                        placeholder="Product description"
                        value={description}
                    ></textarea>
                    <button
                        type="submit"
                        disabled={name === '' || quantity === '' || description === ''}
                        onClick={(ev) =>
                            onEdit({
                                ev,
                                product,
                                name,
                                description,
                                quantity,
                                editProduct,
                                setName,
                                setEdit,
                                setPrice,
                                setQuantity,
                                setDescription,
                            })
                        }
                    >
                        Edit
                    </button>
                </StyledForm>
            )}
        </div>
    )
}

export default Product
