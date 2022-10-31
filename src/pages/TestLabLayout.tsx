import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const TestLabLayout = () => {
  return (
    <div>TestLabLayout
        <nav>
            <Link to="overview">Overview</Link>
            <Link to="/">LogOut</Link>

        </nav>

        <Outlet />
    </div>
  )
}

export default TestLabLayout