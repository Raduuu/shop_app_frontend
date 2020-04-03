import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Cookie from 'js-cookie'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const StyledInput = styled.input`
    display: block;
    font-size: 24px;
    margin-bottom: 10px;
`

const StyledError = styled.p`
    color: red;
    font-size: 12px;
`

const StyledTitle = styled.h2`
    display: block;
    margin-bottom: 30px;
    width: 100%;
`

const StyledLink = styled(Link)`
    width: 100%;
    display: block;
    margin: 10px 0;
`

const StyledButton = styled.button`
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    background: #ed3330;
    padding: 20px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
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
        const email = this.state.email
        const password = this.state.password
        const body = {
            email,
            password,
        }
        const headers = {
            'Content-Type': 'application/json',
        }
        const { type } = this.props
        fetch(`http://localhost:9000/${type === 'login' ? 'signin' : 'signup'}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
            .then(res => res.text())
            .then(res => {
                let apiResponse
                if (this.props.type === 'signup') {
                    apiResponse = JSON.parse(res)
                } else {
                    apiResponse = res !== '' && res !== undefined && JSON.parse(res)
                }
                this.setState({ apiResponse: res })
                if (apiResponse.token && this.props.type === 'login') {
                    let token = apiResponse.token
                    let email = apiResponse.email
                    let isAdmin = apiResponse.admin
                    this.props.setIsLoggedIn({ token, email, isAdmin })
                    this.props.setIsAdmin(apiResponse.admin)
                    this.props.setUserEmail(apiResponse.email)
                    this.props.history.push('/products')
                } else if (!apiResponse.token && this.props.type === 'signup') {
                    this.props.history.push('/login')
                }
            })
    }

    handleEmailChange = e => {
        this.setState({ email: e.target.value })
    }

    handlePasswordChange = e => {
        this.setState({ password: e.target.value })
    }
    render() {
        let isLoggedIn = Cookie.get('token')
        return (
            !isLoggedIn && (
                // <Redirect
                //     to={{
                //         pathname: '/',
                //     }}
                // />
                <Wrapper>
                    <StyledTitle>{this.props.type === 'login' ? 'Sign in' : 'Register'}</StyledTitle>
                    <form noValidate>
                        {this.state.apiResponse && (
                            <StyledError className="error">{JSON.parse(this.state.apiResponse).message}</StyledError>
                        )}
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
                        {this.props.type !== 'login' ? (
                            <StyledLink to="/login">Login</StyledLink>
                        ) : (
                            <StyledLink to="/signup">Register</StyledLink>
                        )}
                        <StyledButton type="submit" onClick={ev => this.onSubmit(ev)}>
                            {this.props.type === 'login' ? 'Login' : 'Register'}
                        </StyledButton>
                    </form>
                </Wrapper>
            )
        )
    }
}

export default withRouter(Login)
