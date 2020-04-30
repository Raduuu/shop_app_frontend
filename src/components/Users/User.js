import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { update, remove } from '../../utils/utils'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    p {
        font-size: 16px;
    }
`

const StyledForm = styled.div`
    display: block;
    > * {
        display: block;
        text-align: left;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
`

const StyledIcon = styled(FontAwesomeIcon)`
    padding: 0 10px;
    cursor: pointer;
`

const onEdit = ({ ev, id, newEmail, isAdmin, setNewEmail, setIsAdmin, setEdit, editUser }) => {
    ev.preventDefault()
    const body = {
        email: newEmail,
        admin: isAdmin,
    }

    update(`api/user/${id}`, body, (res) => {
        editUser(res.data)
        // updateUsers(res.data, 'update')
        setNewEmail('')
        setIsAdmin(isAdmin)
        setEdit(false)
    })
}

const onDelete = (id, updateUsers) => {
    remove(`api/user/${id}`, (res) => {
        updateUsers(res.data, 'delete')
    })
}

const User = ({ email, id, admin, updateUsers, editUser }) => {
    let [newEmail, setNewEmail] = useState(email)
    let [isAdmin, setIsAdmin] = useState(admin)
    let [edit, setEdit] = useState(false)
    return (
        <>
            <Wrapper>
                <p>{email}</p>
                <div>
                    <StyledIcon
                        icon={faEdit}
                        color={'#FF715B'}
                        onClick={() => {
                            setEdit(!edit)
                        }}
                    />
                    <StyledIcon icon={faTrash} color={'#FF715B'} onClick={() => onDelete(id, updateUsers)} />
                </div>
            </Wrapper>
            {edit && (
                <StyledForm noValidate>
                    <input
                        type="email"
                        name="email"
                        placeholder="New email"
                        onChange={(ev) => setNewEmail(ev.target.value)}
                        value={newEmail}
                    />
                    <div>
                        <input
                            type="checkbox"
                            id="isAdmin"
                            name={`isAdmin-${id}`}
                            value={isAdmin}
                            checked={isAdmin}
                            onChange={(ev) => setIsAdmin(ev.target.checked)}
                        />
                        <label htmlFor={`isAdmin-${id}`}> is admin</label>
                    </div>
                    <button
                        type="submit"
                        disabled={newEmail === ''}
                        onClick={(ev) =>
                            onEdit({
                                ev,
                                id,
                                newEmail,
                                isAdmin,
                                setNewEmail,
                                setIsAdmin,
                                setEdit,
                                editUser,
                            })
                        }
                    >
                        Submit
                    </button>
                </StyledForm>
            )}
        </>
    )
}

User.propTypes = {
    email: PropTypes.string,
    id: PropTypes.string,
    admin: PropTypes.bool,
    updateUsers: PropTypes.func,
    editUser: PropTypes.func,
}

User.defaultProps = {
    email: '',
    id: '',
    admin: false,
    updateUsers: () => {},
    editUser: () => {},
}

export default User
