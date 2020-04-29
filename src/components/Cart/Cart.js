import React from 'react'
import CartProduct from './CartProduct'
import { withRouter } from 'react-router-dom'
import Cookie from 'js-cookie'
import styled from 'styled-components'
import { post } from '../../utils/utils'

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

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cartProds: undefined,
        }
    }

    componentDidMount = () => {
        const cartProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : undefined
        this.setState({ cartProds: cartProducts })
    }

    onCheckout = (cartProducts) => {
        const spentCoins = cartProducts.reduce((acc, curr) => {
            return acc + curr.price * curr.quantity
        }, 0)
        const remainingCoins = Cookie.get('coins') - spentCoins
        const body = { products: cartProducts }

        post(
            body,
            'api/checkout/',
            (res) => {
                this.setState({ apiResponse: res })
                Cookie.set('cart', [])
                this.props.setCartProducts(0)
                Cookie.set('coins', remainingCoins)
                this.props.setCoins(remainingCoins)
                this.setState({ cartProds: undefined })
                this.props.history.push('/products')
            },
            (err) => {
                this.setState({ apiResponse: err.response.data })
            },
        )
    }

    changeCartProducts = (id, quantity) => {
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
        this.setState({ cartProds: cart })
        Cookie.set('cart', cart)
    }

    removeCartProduct = (id) => {
        let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
        const { setCartProducts } = this.props
        let total = 0
        const newCart = cart.filter((elem) => elem._id !== id)
        this.setState({ cartProds: newCart })
        for (let i = 0; i < newCart.length; i++) {
            total = total + newCart[i].quantity
        }
        setCartProducts(total)
        this.setState({ cartProducts: total })
        Cookie.set('cart', newCart)
    }

    render() {
        const { cartProds } = this.state
        return cartProds ? (
            <Wrapper>
                {this.state.apiResponse && <Error>{this.state.apiResponse.message}</Error>}
                {cartProds.map((cartProduct) => (
                    <CartProduct
                        key={cartProduct._id}
                        id={cartProduct._id}
                        changeCartProducts={this.changeCartProducts}
                        removeCartProduct={this.removeCartProduct}
                        {...cartProduct}
                    ></CartProduct>
                ))}
                {cartProds.length > 0 && <StyledButton onClick={() => this.onCheckout(cartProds)}>Buy!</StyledButton>}
            </Wrapper>
        ) : null
    }
}

export default withRouter(Cart)
