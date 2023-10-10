import React from 'react'
import { Outlet } from 'react-router-dom'  //what is an Outlet in React?
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
        <DashHeader /> {/*DashHeader is now part of the header of the protected part of our app */}
        <div className='dash-container'>
            <Outlet />
        </div>
        <DashFooter />
    </>
  )
}

export default DashLayout
