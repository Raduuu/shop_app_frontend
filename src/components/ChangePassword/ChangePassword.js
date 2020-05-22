import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { changePassword } from '../../redux/actions/password'
import { connect } from 'react-redux'

const StyledError = styled.p`
    color: red;
    font-size: 12px;
`

const StyledInput = styled.input`
    display: block;
    margin-bottom: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 200px;
`

const handleSubmit = async ({ ev, changePassword, match, newpassword, newpassword2, push, setError }) => {
    ev.preventDefault()
    const { params } = match

    if (newpassword !== newpassword2) {
        setError("Passwords don't match")
    } else {
        await changePassword({
            params,
            newpassword,
        })
        push('/login')
    }
}

const PasswordPage = ({ history }) => {
    const [newpassword, setNewpassword] = useState('')
    const [newpassword2, setNewpassword2] = useState('')
    const [error, setError] = useState(false)
    const { match, push } = history
    return (
        <>
            <h2>Change Password</h2>
            <form noValidate>
                {error && <StyledError>{error}</StyledError>}
                <StyledInput
                    name="newpassword"
                    type="password"
                    placeholder="New Password"
                    onChange={(ev) => setNewpassword(ev.target.value)}
                />
                <StyledInput
                    name="newpassword2"
                    type="password"
                    placeholder="Again your new password"
                    onChange={(ev) => setNewpassword2(ev.target.value)}
                />
                <button
                    type="submit"
                    onClick={(ev) =>
                        handleSubmit({ ev, changePassword, match, newpassword, newpassword2, push, setError })
                    }
                >
                    Submit
                </button>
            </form>
        </>
    )
}

PasswordPage.propTypes = {
    email: PropTypes.string,
}

PasswordPage.defaultProps = {
    email: '',
}

const mapDispatchToProps = (dispatch) => ({
    changePassword: (body) => dispatch(changePassword(body)),
})

export default withRouter(connect(null, mapDispatchToProps)(PasswordPage))
