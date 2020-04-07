import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    display: inline-block;
    padding: 5px 20px;
`

const CartProduct = ({ name, quantity }) => {
    return (
        <>
            <Wrapper>
                <p>{name}</p>
                <p>Quantity: {quantity}</p>
            </Wrapper>
        </>
    )
}

export default CartProduct
