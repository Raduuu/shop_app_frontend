import React from 'react'
import './App.css'
import Login from './components/Login/Login'
import Products from './components/Products/Products'
import Header from './components/Header/Header'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Users from './components/Users/Users'
import Cart from './components/Cart/Cart'
import CartModal from './components/CartModal/CartModal'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'
import { connect } from 'react-redux'
import { setToken } from './redux/actions/token'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: false,
            email: '',
            coins: 0,
            cartProducts: 0,
        }
    }

    setIsLoggedIn = ({ token, email, isAdmin, coins }) => {
        const { saveToken } = this.props
        token && Cookie.set('token', token)
        token && saveToken(token)
        email && Cookie.set('email', email)
        isAdmin && Cookie.set('isAdmin', isAdmin) //used cookie to persist data on refresh
        coins && Cookie.set('coins', coins)
        this.setState({
            coins,
            email,
            isAdmin,
        })
    }

    setCartProducts = (cartNumber) => {
        this.setState({ cartProducts: cartNumber })
    }

    setCoins = (coins) => {
        this.setState({ coins: coins })
    }

    render() {
        const token = Cookie.get('token')
        const email = Cookie.get('email')
        const { cartModal } = this.props
        return (
            <div className="App">
                {cartModal && <CartModal />}
                {token && (
                    <p>
                        Welcome, {email} - Coins: {Cookie.get('coins')}{' '}
                    </p>
                )}
                <Router>
                    {token && <Header cartProducts={this.state.cartProducts}></Header>}
                    <Switch>
                        <Route path="/signup">
                            <Login type="signup" />
                        </Route>
                        <Route path="/login">
                            <Login type="login" isLoggedIn={!!token} setIsLoggedIn={this.setIsLoggedIn} />
                        </Route>
                        <Route path="/forgotpassword">
                            <ForgotPassword></ForgotPassword>
                        </Route>
                        <Route path="/products">
                            <Products isAdmin={this.state.isAdmin} setCartProducts={this.setCartProducts}></Products>
                        </Route>
                        <Route path="/password/:id/:token" component={ChangePassword}></Route>
                        <Route path="/users">
                            <Users></Users>
                        </Route>
                        <Route path="/cart">
                            <Cart setCartProducts={this.setCartProducts} setCoins={this.setCoins}></Cart>
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

const mapStateToProps = (state) => ({
    token: state.token,
    cartModal: state.modals.cartModal,
})

const mapDispatchToProps = (dispatch) => ({
    saveToken: (token) => dispatch(setToken(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
