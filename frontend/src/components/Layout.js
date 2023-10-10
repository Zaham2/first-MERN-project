import { Outlet } from "react-router-dom";

import React from 'react'

// This will render the children of the Outlet component
// We're going to make this our parent component
// if we decide to make a banner, footer, etc... that shows in the entire application, we can add it here... shows even on private (protected) routes
const Layout = () => {
  return <Outlet />
}

export default Layout
