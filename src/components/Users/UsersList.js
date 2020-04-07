import React from 'react'
import User from './User'

const UsersList = ({ users, updateUsers, editUser }) => {
    return (
        users &&
        users.map((user) => (
            <User
                email={user.email}
                id={user._id}
                admin={user.admin}
                key={user._id}
                editUser={editUser}
                updateUsers={updateUsers}
            ></User>
        ))
    )
}

export default UsersList
