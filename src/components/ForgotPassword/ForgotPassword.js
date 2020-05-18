import React, { useState } from 'react'
import styled from 'styled-components'
import { forgotPassword } from '../../redux/actions/password'
import { connect } from 'react-redux'

const FormWrapper = styled.form`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
`

const onSubmit = ({ ev, forgotPassword, email }) => {
    ev.preventDefault()
    forgotPassword(email)
}

const ForgotPassword = ({ forgotPassword }) => {
    const [email, setEmail] = useState('')
    return (
        <FormWrapper noValidate>
            <h2>Forgot Password</h2>
            <input type="email" placeholder="Email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
            <button type="submit" onClick={(ev) => onSubmit({ ev, forgotPassword, email })}>
                Submit
            </button>
        </FormWrapper>
    )
}

const mapDispatchToProps = (dispatch) => ({
    forgotPassword: (body) => dispatch(forgotPassword(body)),
})

export default connect(null, mapDispatchToProps)(ForgotPassword)
