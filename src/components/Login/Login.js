import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import { validateEmail, post } from '../../utils/utils'
import PropTypes from 'prop-types'

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
    text-transform: uppercase;
    background: #ed3330;
    padding: 8px 20px;
    border-radius: 5px;
    display: inline-block;
    transition: all 0.4s ease 0s;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    color: #ffffff;
    border: none;
`

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            apiResponse: null,
        }
    }

    componentDidMount() {
        this.setState({
            email: '',
            password: '',
            apiResponse: null,
        })
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const email = this.state.email
        const password = this.state.password
        const body = {
            email,
            password,
        }
        const { type } = this.props

        if (!validateEmail(email)) {
            this.setState({ emailError: 'Email is not valid' })
        } else {
            if (this.props.type !== 'login' && email !== this.state.email2) {
                this.setState({ emailError: "Emails don't match" })
            } else {
                this.setState({ emailError: undefined })
                post(
                    body,
                    `${type === 'login' ? 'signin' : 'signup'}`,
                    (res) => {
                        let apiResponse
                        apiResponse = res !== '' && res !== undefined && res.data
                        this.setState({ apiResponse: apiResponse })
                        if (apiResponse.token && this.props.type === 'login') {
                            let { token, email, admin, coins } = apiResponse
                            this.props.setIsLoggedIn({ token, email, isAdmin: admin, coins })
                            this.props.history.push('/products')
                        } else if (this.props.type === 'signup') {
                            this.props.history.push('/login')
                        }
                    },
                    (err) => {
                        err.response && err.response.data && this.setState({ apiResponse: err.response.data })
                    },
                )
            }
        }
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }
    render() {
        let isLoggedIn = Cookie.get('token')
        return (
            !isLoggedIn && (
                <Wrapper>
                    <StyledTitle>{this.props.type === 'login' ? 'Sign in' : 'Sign up'}</StyledTitle>
                    <form noValidate>
                        {this.state.apiResponse && (
                            <StyledError className="error">{this.state.apiResponse.message}</StyledError>
                        )}
                        {this.state.emailError && <StyledError>{this.state.emailError}</StyledError>}
                        <StyledInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => this.handleEmailChange(e)}
                        ></StyledInput>
                        {this.props.type !== 'login' && (
                            <StyledInput
                                type="email"
                                name="email2"
                                placeholder="Confirm email"
                                onChange={(e) => this.setState({ email2: e.target.value })}
                            ></StyledInput>
                        )}

                        <StyledInput
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.handlePasswordChange(e)}
                        ></StyledInput>
                        {this.props.type !== 'login' ? (
                            <StyledLink to="/login">Sign in</StyledLink>
                        ) : (
                            <StyledLink to="/signup">Sign up</StyledLink>
                        )}
                        <StyledButton type="submit" onClick={(ev) => this.onSubmit(ev)}>
                            {this.props.type === 'login' ? 'Sign in' : 'Sign up'}
                        </StyledButton>
                    </form>
                </Wrapper>
            )
        )
    }
}

Login.propTypes = {
    type: PropTypes.string,
}

Login.defaultProps = {
    type: '',
}

export default withRouter(Login)
