import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import axios from 'axios'
import Cookie from 'js-cookie'

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

const onEdit = () => {}

const onDelete = (product, updateProducts) => {
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }

    axios({
        url: `http://localhost:9000/api/item/${product._id}`,
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
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.quantity} in stock</p>
            <IconsWrapper>
                <StyledIcon onClick={() => {}}>
                    <FontAwesomeIcon icon={faEdit} color="#4c6ef5" />
                </StyledIcon>
                <StyledIcon onClick={() => onDelete(product, updateProducts)}>
                    <FontAwesomeIcon icon={faTrash} color="#4c6ef5" />
                </StyledIcon>
            </IconsWrapper>
        </div>
    )
}

export default Product
