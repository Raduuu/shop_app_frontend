import React from 'react'
import Cookie from 'js-cookie'
import { post } from '../../utils/utils'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledError = styled.p`
    color: red;
    font-size: 12px;
`

const Success = styled.p`
    color: green;
    font-size: 12px;
`

const StyledInput = styled.input`
    display: block;
    margin-bottom: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 200px;
`
class PasswordPage extends React.Component {
    constructor(props) {
        super(props)
        // potential security risk
        this.state = {
            oldpassword: '',
            newpassword: '',
            newpassword2: '',
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        if (this.state.newpassword !== this.state.newpassword2) {
            this.setState({ error: "Passwords don't match" })
        } else {
            const body = {
                email: Cookie.get('email'),
                oldpassword: this.state.oldpassword,
                newpassword: this.state.newpassword,
            }

            post(
                body,
                'api/changepassword',
                (res) => {
                    this.setState({ error: undefined, success: res.data.message })
                },
                (err) => {
                    this.setState({ success: undefined, error: err.response.data.message })
                    console.error(err)
                },
            )
        }
    }

    render() {
        return (
            <form noValidate>
                {this.state.error && <StyledError>{this.state.error}</StyledError>}
                {this.state.success && <Success>{this.state.success}</Success>}
                <StyledInput
                    name="oldpassword"
                    type="password"
                    placeholder="Old Password"
                    onChange={(ev) => this.setState({ oldpassword: ev.target.value })}
                />
                <StyledInput
                    name="newpassword"
                    type="password"
                    placeholder="New Password"
                    onChange={(ev) => this.setState({ newpassword: ev.target.value })}
                />
                <StyledInput
                    name="newpassword2"
                    type="password"
                    placeholder="Again your new password"
                    onChange={(ev) => this.setState({ newpassword2: ev.target.value })}
                />
                <button type="submit" onClick={(ev) => this.handleSubmit(ev)}>
                    Submit
                </button>
            </form>
        )
    }
}

PasswordPage.propTypes = {
    email: PropTypes.string,
}

PasswordPage.defaultProps = {
    email: '',
}

export default PasswordPage
