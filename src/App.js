import React from 'react'
import './App.css'
import Login from './components/Login/Login'
import MainView from './components/MainView/MainView'
import Products from './components/Products/Products'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: !!Cookie.get('token'),
            isAdmin: false,
            email: '',
        }
    }

    setIsLoggedIn = token => {
        this.setState({
            isLoggedIn: !!Cookie.get('token'),
        })
        token && Cookie.set('token', token)
    }

    setIsAdmin = isAdmin => {
        this.setState({
            isAdmin: isAdmin,
        })
    }

    setUserEmail = email => {
        this.setState({
            email: email,
        })
    }

    render() {
        const token = Cookie.get('token')
        console.log(token)
        console.log('this.state.isLoggedIn', this.state.isLoggedIn)
        return (
            <div className="App">
                {!!token && <p>Welcome, {this.state.email}</p>}
                <Router>
                    {!!token && <Header setIsLoggedIn={this.setIsLoggedIn}></Header>}
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
                                setUserEmail={this.setUserEmail}
                            />
                        </Route>
                        <Route path="/products">
                            <Products isAdmin={this.state.isAdmin}></Products>
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
