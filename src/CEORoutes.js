import React from 'react'
const CEO = React.lazy(() => import('./views/dashboard/CEODashboard')) 

const CEO_routes = [
  {path : '/dashboard/ceo', name: 'CEO', element: CEO},
]

export default CEO_routes
