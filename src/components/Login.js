import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledInput = styled.input`
    display: block;
    font-size: 24px;
    margin-bottom: 10px;
`

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    onSubmit = ev => {
        ev.preventDefault()
        console.log(this.state)
        const email = this.state.email
        const password = this.state.password
        const body = {
            email,
            password,
        }
        const headers = {
            'Content-Type': 'application/json',
        }

        fetch('http://localhost:9000/signin', {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
    }

    handleEmailChange = e => {
        this.setState({ email: e.target.value })
    }

    handlePasswordChange = e => {
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <Wrapper>
                <form noValidate>
                    <StyledInput
                        type="text"
                        placeholder="Email"
                        onChange={e => this.handleEmailChange(e)}
                    ></StyledInput>
                    <StyledInput
                        type="password"
                        placeholder="Password"
                        onChange={e => this.handlePasswordChange(e)}
                    ></StyledInput>
                    <button type="submit" onClick={ev => this.onSubmit(ev)}>
                        Login
                    </button>
                </form>
            </Wrapper>
        )
    }
}

export default Login
