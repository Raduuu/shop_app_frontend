import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: block;
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #dccece;
`

const DeleteButton = styled.button`
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
    cursor: pointer;
    margin-left: 10px;
`

const CartProduct = ({ name, id, quantity, changeCartProducts, removeCartProduct, setCartProds, setCartProducts }) => {
    return (
        <>
            <Wrapper>
                <p>{name}</p>
                <span>Quantity: </span>
                <input
                    type="number"
                    defaultValue={quantity}
                    onChange={(ev) => {
                        const { value } = ev.target
                        changeCartProducts({ id, value, setCartProds })
                    }}
                />
                <DeleteButton onClick={() => removeCartProduct({ id, setCartProducts, setCartProds })}>
                    Remove product
                </DeleteButton>
            </Wrapper>
        </>
    )
}

export default CartProduct
