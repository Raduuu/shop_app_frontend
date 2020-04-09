import React from 'react'
import styled from 'styled-components'
import Cookie from 'js-cookie'

const Wrapper = styled.div`
    display: block;
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #dccece;
`

const StyledButton = styled.button`
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
`

const CartProduct = ({ name, id, quantity, changeCartProducts, removeCartProduct }) => {
    return (
        <>
            <Wrapper>
                <p>{name}</p>
                <span>Quantity: </span>
                <input
                    type="number"
                    defaultValue={quantity}
                    onChange={(ev) => changeCartProducts(id, ev.target.value)}
                />
                <StyledButton onClick={() => removeCartProduct(id)}>Remove product</StyledButton>
            </Wrapper>
        </>
    )
}

export default CartProduct
