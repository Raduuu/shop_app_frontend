import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Cookie from 'js-cookie'

const StyledList = styled.ul`
    li {
        display: inline-block;
        margin-right: 30px;
    }
`

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    handleLogout = () => {
        this.props.setIsLoggedIn(undefined)
        this.props.history.push('/login')
        Cookie.remove('token')
    }

    render() {
        return (
            <StyledList>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/password">Change password</Link>
                </li>
                <li>
                    <a href="" onClick={this.handleLogout}>
                        Logout
                    </a>
                </li>
            </StyledList>
        )
    }
}

export default withRouter(Header)
