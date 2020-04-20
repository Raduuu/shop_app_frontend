import React from 'react'
import UsersList from './UsersList'
import styled from 'styled-components'
import { get } from '../../utils/utils'

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
        get('api/user/', (res) => {
            this.setState({ users: res.data.data })
        })
    }

    editUser = (user) => {
        this.setState((prevState) => {
            const users = [...prevState.users]
            const index = users.findIndex((elem) => elem._id === user.data._id)
            users[index] = user.data
            return { users }
        })
    }
    updateUsers = (user, type = 'update') => {
        if (type === 'update') {
            this.setState({ users: [...this.state.users, user.data] })
        } else if (type === 'delete') {
            this.setState({ users: this.state.users.filter((item) => item._id !== user.data._id) })
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
