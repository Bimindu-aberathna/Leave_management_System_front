import React from 'react'
const ManagetDashboard = React.lazy(() => import('./views/dashboard/ManagerDashboard'))
// const Notifications



const manager_routes = [
  {path : '/dashboard/manager', name: 'ManagerDashboard', element: ManagetDashboard},
]


export default manager_routes
