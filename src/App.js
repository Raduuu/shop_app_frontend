import React from 'react'
import './App.css'
import Login from './components/Login/Login'
import Products from './components/Products/Products'
import Header from './components/Header/Header'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Users from './components/Users/Users'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: false,
            email: '',
            coins: 0,
        }
    }

    setIsLoggedIn = ({ token, email, isAdmin, coins }) => {
        token && Cookie.set('token', token)
        email && Cookie.set('email', email)
        isAdmin && Cookie.set('isAdmin', isAdmin) //used cookie to persist data on refresh
        coins && Cookie.set('coins', coins)
        this.setState({
            coins,
            email,
            isAdmin,
        })
    }

    render() {
        const token = Cookie.get('token')
        const email = Cookie.get('email')
        return (
            <div className="App">
                {!!token && (
                    <p>
                        Welcome, {email} - Coins: {Cookie.get('coins')}{' '}
                    </p>
                )}
                <Router>
                    {!!token && <Header setIsLoggedIn={this.setIsLoggedIn}></Header>}
                    <Switch>
                        <Route path="/signup">
                            <Login type="signup" />
                        </Route>
                        <Route path="/login">
                            <Login type="login" isLoggedIn={!!token} setIsLoggedIn={this.setIsLoggedIn} />
                        </Route>
                        <Route path="/products">
                            <Products isAdmin={this.state.isAdmin}></Products>
                        </Route>
                        <Route path="/password">
                            <ChangePassword email={this.state.email}></ChangePassword>
                        </Route>
                        <Route path="/users">
                            <Users></Users>
                        </Route>
                        <Route path="/cart">
                            <Cart></Cart>
                        </Route>
                        <Route
                            path="/"
                            render={({ location }) => {
                                return !token ? (
                                    <Redirect
                                        to={{
                                            pathname: '/login',
                                        }}
                                    />
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/products',
                                        }}
                                    />
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
