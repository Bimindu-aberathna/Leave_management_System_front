import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://www.aahaas.com/" target="_blank" rel="noopener noreferrer">
          AAHAAS
        </a>
        <span className="ms-1">&copy; 2024 Aahhas Leave Management System.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
