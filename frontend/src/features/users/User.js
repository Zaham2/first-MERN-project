import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

import React from 'react'

const User = ({ userId }) => {

    const user = useSelector(state => selectUserById(state, userId))
    const navigate = useNavigate()

    if(user){
        const handleEdit = () => { navigate(`/users/${userId}`) }
        const userRolesString = user.roles?.toString().replaceAll(',', ', ')
        const cellStatus = user.active ? '' : 'table__cell--inactive'

    return (
        <tr>
            <td className={`table__cell ${cellStatus}`}>{user.username}</td>
            <td className={`table__cell ${cellStatus}`}>{user.email}</td>
            <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
            <td className={`table__cell ${cellStatus}`}>
                <button onClick={handleEdit}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </td>
        </tr>
    )
    } else return null

}

export default User
