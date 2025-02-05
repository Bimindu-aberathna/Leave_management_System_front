import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CBadge,
  CPopover,
} from '@coreui/react'
import { toast } from 'react-toastify'

const NotificationsPage = () => {
  // Test data for notifications
  const testNotifications = [
    {
      id: 1,
      type: 'Leave Approval',
      message: 'Your leave request for June 1, 2023, has been approved.',
      date: '2023-05-30T10:00:00Z',
      viewed: false,
    },
    {
      id: 2,
      type: 'Leave Rejection',
      message: 'Your leave request for June 5, 2023, has been rejected.',
      date: '2023-05-31T14:30:00Z',
      viewed: false,
    },
    {
      id: 3,
      type: 'Leave Reminder',
      message: 'You have 2 remaining casual leaves for this year.',
      date: '2023-06-01T09:15:00Z',
      viewed: true,
    },
    {
      id: 4,
      type: 'Leave Approval',
      message: 'Your leave request for June 10, 2023, has been approved.',
      date: '2023-06-02T16:45:00Z',
      viewed: false,
    },
  ]

  const [notifications, setNotifications] = useState(testNotifications)

  const markAsViewed = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, viewed: true } : notification,
      ),
    )
    toast.success('Notification marked as viewed')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Leave Notifications</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Message</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {notifications.map((notification) => (
                    <CTableRow key={notification.id}>
                      <CTableDataCell>{notification.type}</CTableDataCell>
                      <CPopover
                        title="Popover title"
                        content="And here’s some amazincegrew gr cwr rtewuiu yerihqwiu  ryuiqwhe suy cewr io ow hgwij lghfiu h uiwgrkfg yugh gu fxg content. It’s very engaging. Right?"
                        placement="right"
                      >
                        <CTableDataCell>{notification.message}</CTableDataCell>
                      </CPopover>
                      <CTableDataCell>{formatDate(notification.date)}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={notification.viewed ? 'success' : 'warning'}>
                          {notification.viewed ? 'Viewed' : 'Unviewed'}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        {!notification.viewed && (
                          <CButton
                            color="primary"
                            size="sm"
                            onClick={() => markAsViewed(notification.id)}
                          >
                            Mark as Viewed
                          </CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default NotificationsPage
