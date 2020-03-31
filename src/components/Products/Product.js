import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
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

const onEdit = ({ ev, product, name, description, quantity, setName, setDescription, setQuantity, updateProducts }) => {
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

    console.log('body', body)

    axios.put(`http://localhost:9000/api/product/${product._id}`, body, { headers: headers }).then(res => {
        updateProducts(res.data, 'update')
        setName('')
        setDescription('')
        setQuantity('')
        // setEdit(false)
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
    }).then(res => {
        updateProducts(res.data, 'delete')
    })
}

const Product = ({ product, updateProducts }) => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState('')
    const [edit, setEdit] = useState(false)
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.quantity} in stock</p>
            <IconsWrapper>
                <StyledIcon onClick={() => setEdit(!edit)}>
                    <FontAwesomeIcon icon={faEdit} color="#4c6ef5" />
                </StyledIcon>
                <StyledIcon onClick={() => onDelete(product, updateProducts)}>
                    <FontAwesomeIcon icon={faTrash} color="#4c6ef5" />
                </StyledIcon>
            </IconsWrapper>
            {edit && (
                <StyledForm noValidate>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name"
                        onChange={ev => setName(ev.target.value)}
                        value={name}
                    />
                    <input
                        type="text"
                        name="quantity"
                        placeholder="Product quantity"
                        onChange={ev => setQuantity(ev.target.value)}
                        value={quantity}
                    />
                    <textarea
                        name="description"
                        width="300"
                        height="100"
                        onChange={ev => setDescription(ev.target.value)}
                        placeholder="Product description"
                        value={description}
                    ></textarea>
                    <button
                        type="submit"
                        disabled={name === '' || quantity === '' || description === ''}
                        onClick={ev =>
                            onEdit({
                                ev,
                                product,
                                name,
                                description,
                                quantity,
                                updateProducts,
                                setName,
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
