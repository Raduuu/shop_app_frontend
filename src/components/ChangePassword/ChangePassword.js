import React from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'

class PasswordPage extends React.Component {
    constructor(props) {
        super(props)
        // potential security risk
        this.state = {
            oldpassword: '',
            newpassword: '',
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        const token = Cookie.get('token') ? Cookie.get('token') : null
        const BearerToken = `Bearer ${token}`
        const headers = {
            'Content-Type': 'application/json',
            Authorization: BearerToken,
        }

        const body = {
            email: Cookie.get('email'),
            oldpassword: this.state.oldpassword,
            newpassword: this.state.newpassword,
        }
        axios
            .post('http://localhost:9000/api/changepassword', body, { headers: headers })
            .then((res) => {
                this.setState({ success: res.data.message })
            })
            .catch((err) => {
                this.setState({ success: undefined, error: 'an error has occured' })
                console.error(err)
            })
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
                <button type="submit" onClick={(ev) => this.handleSubmit(ev)}>
                    Submit
                </button>
            </form>
        )
    }
}

export default PasswordPage
