import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'

// Import all routes
import routes from '../routes'
import manager_routes from '../ManagerRoutes'
import CEO_routes from '../CEORoutes'

const AppContent = () => {
  // Combine all routes into a single array
  const allRoutes = [
    ...routes.map((route) => ({ ...route, requiredRoles: [1, 2] })), // Employee and Manager routes
    ...manager_routes.map((route) => ({ ...route, requiredRoles: [2] })), // Manager routes
    ...CEO_routes.map((route) => ({ ...route, requiredRoles: [3] })), // CEO routes
  ]

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {/* Employee routes - accessible by employees only */}
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <ProtectedRoute requiredRoles={[1,2]}>
                      <route.element />
                    </ProtectedRoute>
                  }
                />
              )
            )
          })}

          {/* Manager routes - accessible by managers only */}
          {manager_routes.map(
            (route, idx) =>
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <ProtectedRoute requiredRoles={2}>
                      <route.element />
                    </ProtectedRoute>
                  }
                />
              ),
          )}

          {/* CEO routes - accessible by CEO only */}
          {CEO_routes.map(
            (route, idx) =>
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <ProtectedRoute requiredRoles={3}>
                      <route.element />
                    </ProtectedRoute>
                  }
                />
              ),
          )}

          {/* Default and 404 routes */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
