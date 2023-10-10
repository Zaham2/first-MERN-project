import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
  return (
    <header>
        <div className='dash-header__container'>
            <Link to='/dash'>
                <h1>techNotes</h1>
            </Link>
            <nav className='dash-header__nav'>
                
            </nav>
        </div>
    </header>
  )
}

export default DashHeader
