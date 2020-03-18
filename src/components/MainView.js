import React from 'react'
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom'

class MainView extends React.Component {
    constructor(props) {
        super(props)
    }
    handleLogout = () => {
        this.props.setIsLoggedIn(false)
        this.props.history.push('/login')
    }

    render() {
        return <a onClick={this.handleLogout}>Logout</a>
    }
}

export default withRouter(MainView)
