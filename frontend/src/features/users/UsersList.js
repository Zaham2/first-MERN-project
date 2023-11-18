import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UsersList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content

  if (isLoading)
    content = <div className="loader">Loading...</div>

  if (isError){
    content = <div>{error?.data?.message}</div>
  }

  if(isSuccess){
    const { ids } = users

    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId} />)
      : null

      content = (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      )
  }

  return (
    <h1>
      Some content related to user should be rendered here
        {content}
    </h1>
  )
}

export default UsersList
