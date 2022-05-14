import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const DefaultLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    let data = localStorage.getItem('admin-info')
    if (!data) {
      //history.push("/")

      navigate('/login')
    }
    // console.log(data)
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
