import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CBadge,
} from '@coreui/react'

const Notifications = () => {
    
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Leave Approved',
      message: 'Your leave request for 2021-06-01 has been approved.',
      date: '2021-06-01',
      status: 'Unread', // Initial status
    },
    {
      id: 2,
      title: 'New Announcement',
      message: 'A new company policy has been announced. Please review it.',
      date: '2021-06-02',
      status: 'Unread',
    },
    {
      id: 3,
      title: 'Leave Rejected',
      message: 'Your leave request for 2021-06-03 has been rejected.',
      date: '2021-06-03',
      status: 'Unread',
    },
    {
      id: 4,
      title: 'System Update',
      message: 'The system will be down for maintenance on 2021-06-04.',
      date: '2021-06-04',
      status: 'Unread',
    },
  ])

  // Function to mark a notification as "Read"
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: 'Read' }
          : notification
      )
    )
  }

  // Format date function for consistency
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <h5>Notifications</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {notifications.map((notification) => (
                  <CCol md={6} lg={4} key={notification.id} className="mb-4">
                    <CCard
                      className={`border ${
                        notification.status === 'Unread'
                          ? 'border-primary'
                          : 'border-light'
                      }`}
                    >
                      <CCardBody>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="card-title mb-0">
                            {notification.title}
                          </h6>
                          <CBadge
                            color={
                              notification.status === 'Unread'
                                ? 'primary'
                                : 'success'
                            }
                          >
                            {notification.status}
                          </CBadge>
                        </div>
                        <p className="card-text small text-muted mb-2">
                          {notification.message}
                        </p>
                        <p className="card-text small text-muted">
                          <strong>Date:</strong> {formatDate(notification.date)}
                        </p>
                        {notification.status === 'Unread' && (
                          <CButton
                            color="primary"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </CButton>
                        )}
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Notifications