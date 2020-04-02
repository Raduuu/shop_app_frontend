import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class MainView extends React.Component {
    render() {
        return this.props.isAdmin ? (
            <ul>
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
