import React, { useState, useEffect } from 'react'
import CartProduct from './CartProduct'
import { withRouter } from 'react-router-dom'
import Cookie from 'js-cookie'
import styled from 'styled-components'
import { post } from '../../utils/utils'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
    border-radius: 4px;
    margin: 20px 0 0 20px;
    color: #fff;
    background-color: #28a745;
    border: 1px solid #28a745;
    cursor: pointer;
    &:hover {
        color: #fff;
        background-color: #218838;
        border-color: #1e7e34;
    }
`

const Error = styled.p`
    color: red;
    font-size: 12px;
`

const Wrapper = styled.div`
    text-align: left;
    margin: 0 20px;
`

const onCheckout = ({ cartProducts, setApiResponse, setCartProds, setCartProducts, setCoins, push }) => {
    const spentCoins = cartProducts.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity
    }, 0)
    const remainingCoins = Cookie.get('coins') - spentCoins
    const body = { products: cartProducts }

    post(
        body,
        'api/checkout/',
        (res) => {
            setApiResponse(res)
            Cookie.set('cart', [])
            setCartProducts(0)
            Cookie.set('coins', remainingCoins)
            setCoins(remainingCoins)
            setCartProds(undefined)
            push('/products')
        },
        (err) => {
            this.setState({ apiResponse: err.response.data })
        },
    )
}

const removeCartProduct = ({ id, setCartProducts, setCartProds }) => {
    let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
    let total = 0
    const newCart = cart.filter((elem) => elem._id !== id)
    setCartProds(newCart)
    for (let i = 0; i < newCart.length; i++) {
        total = total + newCart[i].quantity
    }
    setCartProducts(total)
    // this.setState({ cartProducts: total })
    Cookie.set('cart', newCart)
}

const changeCartProducts = ({ id, quantity, setCartProds }) => {
    let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
    let found = false
    let i = 0
    while (found === false && i < cart.length) {
        if (cart[i]._id === id) {
            cart[i].quantity = quantity
            found = true
        }
        i++
    }
    setCartProds(cart)
    Cookie.set('cart', cart)
}

const Cart = ({ setCartProducts, setCoins, history }) => {
    const [cartProds, setCartProds] = useState(undefined)
    const [apiResponse, setApiResponse] = useState(undefined)
    const { push } = history
    let cartProducts

    useEffect(() => {
        // eslint-disable-next-line
        cartProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : undefined
        setCartProds(cartProducts)
    }, [])

    return cartProds ? (
        <Wrapper>
            {apiResponse && <Error>{apiResponse.message}</Error>}
            {cartProds.map((cartProduct) => (
                <CartProduct
                    key={cartProduct._id}
                    id={cartProduct._id}
                    changeCartProducts={changeCartProducts}
                    setCartProds={setCartProds}
                    setCartProducts={setCartProducts}
                    removeCartProduct={removeCartProduct}
                    {...cartProduct}
                ></CartProduct>
            ))}
            {cartProds.length > 0 && (
                <StyledButton
                    onClick={() =>
                        onCheckout({ cartProducts, setApiResponse, setCartProds, setCartProducts, setCoins, push })
                    }
                >
                    Buy!
                </StyledButton>
            )}
        </Wrapper>
    ) : null
}

Cart.propTypes = {
    setCartProducts: PropTypes.func,
    setCoins: PropTypes.func,
}

Cart.defaultProps = {
    setCartProducts: () => {},
    setCoins: () => {},
}

export default withRouter(Cart)
