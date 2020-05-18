import React from 'react'
import Cookie from 'js-cookie'
import { post } from '../../utils/utils'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { changePassword } from '../../redux/actions/password'
import { connect } from 'react-redux'

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
        this.state = {
            newpassword: '',
            newpassword2: '',
        }
    }

    handleSubmit = async (ev) => {
        ev.preventDefault()
        const { changePassword, email } = this.props
        const {
            match: { params },
        } = this.props

        if (this.state.newpassword !== this.state.newpassword2) {
            this.setState({ error: "Passwords don't match" })
        } else {
            const body = {
                params,
                newpassword: this.state.newpassword,
            }

            await changePassword(body)
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <>
                <h2>Change Password</h2>
                <form noValidate>
                    {this.state.error && <StyledError>{this.state.error}</StyledError>}
                    {this.state.success && <Success>{this.state.success}</Success>}
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
            </>
        )
    }
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
