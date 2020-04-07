import React from 'react'
import CartProduct from './CartProduct'
import Cookie from 'js-cookie'
import axios from 'axios'

const onCheckout = (cartProducts) => {
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }
    const body = { products: cartProducts }

    axios({
        url: 'http://localhost:9000/api/checkout/',
        method: 'POST',
        headers: headers,
        data: body,
    }).then((res) => {})
}

const Cart = () => {
    const cartProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
    return (
        <>
            {cartProducts && cartProducts.map((cartProduct) => <CartProduct {...cartProduct}></CartProduct>)}
            <button onClick={() => onCheckout(cartProducts)}>Buy!</button>
        </>
    )
}

export default Cart
