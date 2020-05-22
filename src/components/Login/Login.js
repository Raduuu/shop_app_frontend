import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { validateEmail, post } from '../../utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

const onSubmit = ({ ev, email, type, email2, password, setEmailError, setApiResponse, setIsLoggedIn, push }) => {
    ev.preventDefault()
    const body = {
        email,
        password,
    }

    if (!validateEmail(email)) {
        setEmailError('Email is not valid')
    } else {
        if (type !== 'login' && email !== email2) {
            setEmailError("Emails don't match")
        } else {
            setEmailError(undefined)
            post(
                body,
                `${type === 'login' ? 'signin' : 'signup'}`,
                (res) => {
                    let apiResponse
                    apiResponse = res !== '' && res !== undefined && res.data
                    setApiResponse(apiResponse)
                    if (apiResponse.token && type === 'login') {
                        let { token, email, admin, coins } = apiResponse
                        setIsLoggedIn({ token, email, isAdmin: admin, coins })
                        push('/products')
                    } else if (this.props.type === 'signup') {
                        push('/login')
                    }
                },
                (err) => {
                    err.response && err.response.data && setApiResponse(err.response.data)
                },
            )
        }
    }
}

const Login = ({ token, type, setIsLoggedIn, history }) => {
    const [email, setEmail] = useState('')
    const [email2, setEmail2] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [apiResponse, setApiResponse] = useState(null)
    let isLoggedIn = token.length > 0

    const { push } = history

    return (
        !isLoggedIn && (
            <Wrapper>
                <StyledTitle>{type === 'login' ? 'Sign in' : 'Sign up'}</StyledTitle>
                <form noValidate>
                    {apiResponse && <StyledError className="error">{apiResponse.message}</StyledError>}
                    {emailError && <StyledError>{emailError}</StyledError>}
                    <StyledInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    ></StyledInput>
                    {type !== 'login' && (
                        <StyledInput
                            type="email"
                            name="email2"
                            placeholder="Confirm email"
                            onChange={(e) => setEmail2(e.target.value)}
                        ></StyledInput>
                    )}

                    <StyledInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></StyledInput>
                    {type !== 'login' ? (
                        <StyledLink to="/login">Sign in</StyledLink>
                    ) : (
                        <>
                            <StyledLink to="/forgotpassword">Forgot Password</StyledLink>
                            <StyledLink to="/signup">Sign up</StyledLink>
                        </>
                    )}
                    <StyledButton
                        type="submit"
                        onClick={(ev) =>
                            onSubmit({
                                ev,
                                email,
                                type,
                                email2,
                                password,
                                setEmailError,
                                setApiResponse,
                                setIsLoggedIn,
                                push,
                            })
                        }
                    >
                        {type === 'login' ? 'Sign in' : 'Sign up'}
                    </StyledButton>
                </form>
            </Wrapper>
        )
    )
}

Login.propTypes = {
    type: PropTypes.string,
}

Login.defaultProps = {
    type: '',
}

const mapStateToProps = (state) => ({
    token: state.token,
})

export default connect(mapStateToProps)(withRouter(Login))
