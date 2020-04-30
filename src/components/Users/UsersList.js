import React from 'react'
import User from './User'
import PropTypes from 'prop-types'

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

UsersList.propTypes = {
    users: PropTypes.array,
    updateUsers: PropTypes.func,
    editUser: PropTypes.func,
}

UsersList.defaultProps = {
    users: [],
    updateUsers: () => {},
    editUser: () => {},
}

export default UsersList
