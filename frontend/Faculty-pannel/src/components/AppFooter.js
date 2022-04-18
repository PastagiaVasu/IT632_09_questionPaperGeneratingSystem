import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="/" target="_blank" rel="noopener noreferrer">
          QPGS
        </a>
        <span className="ms-1">&copy; 2022 MScIT Group-9.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="/" target="_blank" rel="noopener noreferrer">
          QPGS &amp; Dashboard
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
