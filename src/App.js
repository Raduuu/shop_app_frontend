import React from 'react'
import './App.css'
import Login from './components/Login'
import MainView from './components/MainView'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
        }
    }

    setIsLoggedIn = () => {
        this.setState({
            isLoggedIn: !this.state.isLoggedIn,
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
                            <Login type="login" setIsLoggedIn={this.setIsLoggedIn} />
                        </Route>
                        <Route path="/">
                            <MainView setIsLoggedIn={this.setIsLoggedIn}></MainView>
                        </Route>
                        <Route
                            render={({ location }) => {
                                debugger
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
