import React from 'react'
// import EditForm from '../EditForm/NewForm'
import UsersList from './UsersList'
import Cookie from 'js-cookie'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 600px;
    display: inline-block;
    text-align: center;
`

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: '',
        }
    }

    componentDidMount() {
        const token = Cookie.get('token') ? Cookie.get('token') : null
        const BearerToken = `Bearer ${token}`
        const headers = {
            'Content-Type': 'application/json',
            Authorization: BearerToken,
        }

        axios({
            url: 'http://localhost:9000/api/user/',
            method: 'GET',
            headers: headers,
        }).then(res => {
            this.setState({ users: res.data.data })
        })
    }

    editUser = user => {
        this.setState(prevState => {
            const users = [...prevState.users]
            const index = users.findIndex(elem => elem._id === user.data._id)
            users[index] = user.data
            return { users }
        })
    }
    updateUsers = (user, type = 'update') => {
        if (type === 'update') {
            this.setState({ users: [...this.state.users, user.data] })
        } else if (type === 'delete') {
            this.setState({ users: this.state.users.filter(item => item._id !== user.data._id) })
        }
    }

    render() {
        return (
            <Wrapper>
                <UsersList users={this.state.users} updateUsers={this.updateUsers} editUser={this.editUser} />
            </Wrapper>
        )
    }
}

export default Users
