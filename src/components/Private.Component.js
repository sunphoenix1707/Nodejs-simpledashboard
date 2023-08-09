import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
//this private component is a wrapper and we will pass component as props,outlet will handle that

const PrivateComponent = () => {
    const auth=localStorage.getItem('user');
  return auth ? <Outlet/> : <Navigate to="/signup"/>
}

export default PrivateComponent
