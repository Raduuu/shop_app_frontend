import React from 'react'
import Cookie from 'js-cookie'
import { create } from '../../utils/utils'

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
        debugger
        if (this.state.newpassword !== this.state.newpassword2) {
            this.setState({ error: "Passwords don't match" })
        } else {
            const body = {
                email: Cookie.get('email'),
                oldpassword: this.state.oldpassword,
                newpassword: this.state.newpassword,
            }

            create(
                body,
                'api/changepassword',
                (res) => {
                    this.setState({ success: res.data.message })
                },
                (err) => {
                    this.setState({ success: undefined, error: 'an error has occured' })
                    console.error(err)
                },
            )
        }
    }

    render() {
        return (
            <form noValidate>
                <p>{this.state.success ? this.state.success : this.state.error}</p>
                <input
                    name="oldpassword"
                    type="password"
                    placeholder="Old Password"
                    onChange={(ev) => this.setState({ oldpassword: ev.target.value })}
                />
                <input
                    name="newpassword"
                    type="password"
                    placeholder="New Password"
                    onChange={(ev) => this.setState({ newpassword: ev.target.value })}
                />
                <input
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

export default PasswordPage
