import React from 'react'
import './App.css'
import Login from './components/Login/Login'
import MainView from './components/MainView/MainView'
import Products from './components/Products/Products'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            isAdmin: false,
        }
    }

    setIsLoggedIn = token => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn,
        })
        token && Cookie.set('token', token)
    }

    setIsAdmin = () => {
        this.setState({
            isAdmin: !this.state.isAdmin,
        })
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/signup">
                            <Login type="signup" />
                        </Route>
                        <Route path="/login">
                            <Login
                                type="login"
                                isLoggedIn={this.state.isLoggedIn}
                                setIsLoggedIn={this.setIsLoggedIn}
                                setIsAdmin={this.setIsAdmin}
                            />
                        </Route>
                        <Route path="/products">
                            <Products></Products>
                        </Route>
                        <Route path="/">
                            <MainView setIsLoggedIn={this.setIsLoggedIn} isAdmin={this.state.isAdmin} />
                        </Route>
                        <Route
                            render={({ location }) => {
                                return (
                                    !this.state.isLoggedIn && (
                                        <Redirect
                                            to={{
                                                pathname: '/login',
                                            }}
                                        />
                                    )
                                )
                            }}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
