import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import PropTypes from 'prop-types'

const StyledList = styled.ul`
    li {
        display: inline-block;
        margin-right: 30px;
    }
`

const handleLogout = (push) => {
    push('/login')
    Cookie.remove('token')
    Cookie.remove('email')
    Cookie.remove('isAdmin')
    Cookie.remove('cart')
    Cookie.remove('coins')
}

const getCartProducts = () => {
    let cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')) : []
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        total = total + parseInt(cart[i].quantity)
    }
    return total
}
const Header = ({ history }) => {
    const isAdmin = Cookie.get('isAdmin')
    const { push } = history
    const cartProducts = getCartProducts()
    return (
        <StyledList>
            <li>
                <Link to="/products">Products</Link>
            </li>
            {isAdmin && (
                <li>
                    <Link to="/users">Users</Link>
                </li>
            )}
            <li>
                <Link to="/cart">{`Cart(${cartProducts})`}</Link>
            </li>
            <li>
                {/* eslint-disable-next-line */}
                <a href="" onClick={() => handleLogout(push)}>
                    Logout
                </a>
            </li>
        </StyledList>
    )
}

Header.propTypes = {
    cartProducts: PropTypes.number,
}

export default withRouter(Header)
