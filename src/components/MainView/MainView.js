import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class MainView extends React.Component {
    constructor(props) {
        super(props)
    }
    handleLogout = () => {
        this.props.setIsLoggedIn(undefined)
        this.props.history.push('/login')
    }

    render() {
        return this.props.isAdmin ? (
            <ul>
                <li>
                    <a href="" onClick={this.handleLogout}>
                        Logout
                    </a>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
            </ul>
        ) : (
            <div>
                <ul>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(MainView)
