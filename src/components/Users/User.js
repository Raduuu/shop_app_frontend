import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import axios from 'axios'

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
    }
`

const StyledIcon = styled(FontAwesomeIcon)`
    padding: 0 10px;
    cursor: pointer;
`

const onEdit = ({ ev, id, newEmail, isAdmin, setNewEmail, setIsAdmin, setEdit, editUser }) => {
    ev.preventDefault()
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }
    const body = {
        email: newEmail,
        admin: isAdmin,
    }

    axios.put(`http://localhost:9000/api/user/${id}`, body, { headers: headers }).then(res => {
        editUser(res.data)
        // updateUsers(res.data, 'update')
        setNewEmail('')
        setIsAdmin(isAdmin)
        setEdit(false)
    })
}

const onDelete = (id, updateUsers) => {
    const token = Cookie.get('token') ? Cookie.get('token') : null
    const BearerToken = `Bearer ${token}`
    const headers = {
        'Content-Type': 'application/json',
        Authorization: BearerToken,
    }

    axios({
        url: `http://localhost:9000/api/user/${id}`,
        method: 'DELETE',
        headers: headers,
    }).then(res => {
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
                        onChange={ev => setNewEmail(ev.target.value)}
                        value={newEmail}
                    />
                    <div>
                        <input
                            type="checkbox"
                            id="isAdmin"
                            name={`isAdmin-${id}`}
                            value={isAdmin}
                            checked={isAdmin}
                            onChange={ev => setIsAdmin(ev.target.checked)}
                        />
                        <label htmlFor={`isAdmin-${id}`}> is admin</label>
                    </div>
                    <button
                        type="submit"
                        disabled={newEmail === ''}
                        onClick={ev =>
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

export default User
