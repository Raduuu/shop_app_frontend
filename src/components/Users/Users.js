import React, { useState, useEffect } from 'react'
import UsersList from './UsersList'
import styled from 'styled-components'
import { get } from '../../utils/utils'

const Wrapper = styled.div`
    width: 600px;
    display: inline-block;
    text-align: center;
`

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        get('api/user/', (res) => {
            setUsers(res.data.data)
        })
        // eslint-disable-next-line
    }, []) // because two objects won't be the same and we need to only compare properties in order for this to work

    const updateUsers = (user, type = 'update') => {
        if (type === 'update') {
            setUsers([...users, user.data])
        } else if (type === 'delete') {
            setUsers(users.filter((item) => item._id !== user.data._id))
        }
    }

    const editUser = (editedUser) => {
        const index = users.findIndex((elem) => elem._id === editedUser.data._id)
        users[index] = editedUser.data
        const newUsers = users.map((user) => {
            if (user._id !== editedUser._id) return user
            return { ...user, email: editedUser.email }
        })
        console.log(newUsers)
        setUsers(newUsers)
    }

    return (
        <Wrapper>
            <UsersList users={users} updateUsers={updateUsers} editUser={editUser} setUsers={setUsers} />
        </Wrapper>
    )
}

export default Users
